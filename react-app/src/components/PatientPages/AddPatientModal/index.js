import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import { StatesList } from "./StatesList"
import AddInitialPatientNote from "./AddInitialPatientNote";

import {
    getSinglePatientThunk,
    postNewPatientThunk,
    putSinglePatientThunk,
    putPatientAddresssThunk,
    postPatientAddressThunk
} from "../../../store/patient";


import "./AddPatientModal.css"

const formatDate = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString)
    return date.toISOString().split('T')[0];
}

function AddPatientModal({
    // Patient ID: Edditing Routes Mainly Use This
    patientId,
    // Props for Adding an Address
    addAddressBool,
    setAddAddress,
    // Props for Editting an Address
    editAddressBool,
    setEditAddress,
    editAddresVals,
    // Props for Editting a Patient
    editPatientBool,
    setEditPatient,
    editPatientVals,
}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    //  --------------- State Variables ---------------
    const [firstName, setFirstName] = useState(editPatientVals?.first_name || "")
    const [lastName, setLastName] = useState(editPatientVals?.last_name || "")
    const [middleName, setMiddleName] = useState(editPatientVals?.middle_name || "")

    const [birthday, setBirthday] = useState(formatDate(editPatientVals?.date_of_birth) || "")

    let validStatuses = ["Inquiry", "Onboarding", "Active", "Churned"]
    const [status, setStatus] = useState(validStatuses.indexOf(editPatientVals?.status) + 1 || "")

    const [address, setAddress] = useState(editAddresVals?.address || "")
    const [city, setCity] = useState(editAddresVals?.city || "")
    const [state, setState] = useState(editAddresVals?.state || "")
    const [isCurrent, setIsCurrent] = useState(editAddresVals?.current)

    const [noteList, setNoteList] = useState([])

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    // ------------ Slice of State Selectors -----------
    const current = useSelector(state => state.session.user)
    const addresses = useSelector(state => state.patient.singlePatient.addresses)

    // To make sure that there is at least one currnet addres in patients file
    let addressCount = Object.values(addresses).filter(address => address.current === true).length


    //------------------- Use Effect -------------------
    useEffect(() => {
        // This useEffect is meant to help with error handling
        const errors = {};

        if (!addAddressBool && !editAddressBool && !firstName.length) errors["firstName"] = "First Name is Required"
        if (!addAddressBool && !editAddressBool && !lastName.length) errors["lastName"] = "Last Name is Required"

        if (!editPatientBool && !address.length) errors["address"] = "Address is Requried"

        if (!editPatientBool && !StatesList.includes(state)) errors["state"] = "Invalid State"
        if (!editPatientBool && !state.length) errors["state"] = "State is Required"
        // if (state.length !== 2) errors["state"] = "Invalid State"

        if (!editPatientBool && !city.length) errors["city"] = "City is Required"
        if (!editPatientBool && city.length < 3) errors["city"] = "Invalid City"
        if (!editPatientBool && city.length > 50) errors["city"] = "Invalid City"

        if (editAddressBool && !isCurrent && addressCount < 2) errors['current'] = "Must have at least one Current Address"

        if (!addAddressBool && !editAddressBool && (!status || status === "Select a Status")) errors["status"] = "Invalid Status"
        if (!addAddressBool && !editAddressBool && !birthday) errors['birthday'] = "Birthday is required."
        if (!addAddressBool && !editAddressBool && new Date(birthday) > Date.now()) errors['birthday'] = "Invalid Birthday"

        setErrors(errors)


    }, [firstName, lastName, middleName, birthday, status, address, state, city, isCurrent, noteList])
    console.log(status)
    //  ------------- Submit Functionalities -------------
    // Function to Submit a New Patient
    const handleSubmit = async (e) => {
        // Meant for adding a new patient / their address
        e.preventDefault()

        // Once Submitted is true, Errors will show in their designated areas
        // ** Will Note Proceed to Delete if there are error ***
        setSubmitted(true)
        if (Object.values(errors).length) return

        // Formats data to whatever it needs to look like
        const patientFormData = new FormData()
        patientFormData.append('first_name', firstName)
        patientFormData.append('last_name', lastName)
        middleName && patientFormData.append('middle_name', middleName)
        patientFormData.append('date_of_birth', birthday)
        patientFormData.append('status_id', status)
        patientFormData.append("provider_id", current.id)

        const addressFormData = new FormData()
        addressFormData.append('address', address)
        addressFormData.append('state', state)
        addressFormData.append('city', city)
        addressFormData.append('isCurrent', true)

        let noteListFormData = []
        noteList.forEach(note => {
            const noteFormData = new FormData
            noteFormData.append("title", note.title)
            noteFormData.append("text", note.text)

            noteListFormData.push(noteFormData)
        })

        const data = await dispatch(postNewPatientThunk(patientFormData, addressFormData, noteListFormData))

        // console.log(data)
        if (data) {
            setErrors(data.errors)
            dispatch(getSinglePatientThunk(patientId))
        }
        else {
            closeModal()

        }
    }
    // Recycling this Componet for adding / editting addresses
    const handleAddressSubmit = async (e) => {
        // Meant for adding a new address to an existing patient
        e.preventDefault()
        setSubmitted(true)
        if (Object.values(errors).length) return

        const addressFormData = new FormData()
        addressFormData.append('address', address)
        addressFormData.append('state', state)
        addressFormData.append('city', city)
        addressFormData.append('isCurrent', isCurrent)

        const data = await (
            editAddressBool ?
                dispatch(putPatientAddresssThunk(patientId, editAddresVals.id, addressFormData))
                :
                dispatch(postPatientAddressThunk(patientId, addressFormData)))

        if (data) {
            setErrors(data.errors)
        }
        else {
            //Future Implementation of InLine Editting as Opposed to Modal ----- 
            addAddressBool && setAddAddress(false)
            editAddressBool && setEditAddress(false)
        }
    }
    // Recycling this Componet for editting a patient
    const handlePatientEdit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        if (Object.values(errors).length) return

        const patientFormData = new FormData()
        patientFormData.append('first_name', firstName)
        patientFormData.append('last_name', lastName)
        middleName && patientFormData.append('middle_name', middleName)
        patientFormData.append('date_of_birth', birthday)
        patientFormData.append('status_id', status)
        patientFormData.append("patient_id", patientId)
        patientFormData.append("provider_id", current.id)

        const data = await dispatch(putSinglePatientThunk(patientId, patientFormData))

        // debugger
        if (data) {
            setErrors(data)
        }
        else {
            //Future Implementation of InLine Editting as Opposed to Modal ----- 
            setEditPatient(false)
            // closeModal()

        }

    }


    //  ---------------- React Component -----------------
    return (
        <form
            className={`${
                (addAddressBool | editAddressBool | editPatientBool) ? 
                "input-form-container" : "form-container"}`}
            onSubmit={handleSubmit}>

            {/* Logic if we are Adding an Address or a patient */}
            {/* Logic for Editting a Patient */}
            {addAddressBool ? "" :
                editAddressBool ? "" :
                    <>
                        <h2 className="form-heading">Please enter the following information</h2>
                        {submitted && <span className='error-message'>{errors.firstName}</span>}
                        <label className="form-label">
                            First Name
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="form-input"
                            />
                        </label>

                        {submitted && <span className="error-message">{errors.middleName}</span>}
                        <label className="form-label">
                            Middle Name <span className="optional-text">(optional)</span>
                            <input
                                type="text"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                className="form-input"
                            />
                        </label>


                        {submitted && <span className='error-message'>{errors.lastName}</span>}
                        <label className="form-label">
                            Last Name
                            <input
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className="form-input"
                            />
                        </label>

                        {submitted && <span className='error-message'>{errors.birthday}</span>}
                        <label className="form-label">
                            Date of Birth
                            <input
                                type="date"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                                className="form-input"
                            />
                        </label>

                        {submitted && <span className='error-message'>{errors.status}</span>}
                        <label className="form-label">
                            Status
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option default>Select a Status</option>
                                <option value="1">Inquiry</option>
                                <option value="2">Onboarding</option>
                                <option value="3">Active</option>
                                <option value="4">Churned</option>
                            </select>
                        </label>
                    </>
            }

            {/* Logic if we are Adding an Address or a Patient */}
            {/* Logic for Editting an Address */}
            {(!editAddressBool && !editPatientBool) ?
                <h4> Please Enter Your Current Address</h4> :
                ""
            }
            {
                !editPatientBool &&
                <>
                    {submitted && <span className='error-message'>{errors.address}</span>}
                    <label className="form-label">
                        Street
                        <input
                            className="form-input"
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </label>

                    {submitted && <span className='error-message'>{errors.city}</span>}
                    <label className="form-label">
                        City
                        <input
                            className="form-input"
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </label>

                    {submitted && <span className='error-message'>{errors.state}</span>}
                    <label className="form-label">
                        State
                        <input
                            className="form-input"
                            type="text"
                            value={state.toUpperCase()}
                            onChange={e => setState(e.target.value.toUpperCase())}
                        />
                    </label>
                </>

            }

            {
                editAddressBool &&
                <>
                    {submitted && <span className='error-message'>{errors.current}</span>}

                    <label className="form-label">
                        Current
                        <input
                            className="form-input"
                            type="checkbox"
                            value={isCurrent}
                            checked={isCurrent}
                            onChange={e => { setIsCurrent(!isCurrent) }}
                        />
                    </label>
                </>
            }

            {(addAddressBool || editAddressBool || editPatientBool) ?
                <div className="button-container">
                    {
                        <button
                            className="form-button"
                            onClick={
                                editPatientBool ?
                                    handlePatientEdit
                                    :
                                    handleAddressSubmit
                            }
                        >
                            {addAddressBool ? "Add" : "Edit"}
                        </button>

                    }
                    <button
                        className="form-button"
                        onClick={() => {
                            addAddressBool && setAddAddress(false)
                            editAddressBool && setEditAddress(false)
                            editPatientBool && setEditPatient(false)
                        }}>
                        Cancel</button>
                </div>
                : ""}

            {(!addAddressBool && !editAddressBool && !editPatientBool) &&
                <>
                    <AddInitialPatientNote
                        noteList={noteList}
                        setNoteList={setNoteList}
                        patientId={patientId}
                    />

                    <button
                        className="form-submit"
                        type="submit"
                    >
                        Submit
                    </button>

                </>
            }

        </form>
    )
}

export default AddPatientModal
