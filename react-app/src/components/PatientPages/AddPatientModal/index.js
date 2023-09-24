import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import { StatesList } from "./StatesList"
import { getSinglePatientThunk, postNewPatientThunk, putPatientAddresssThunk, postPatientAddressThunk } from "../../../store/patient";


function AddPatientModal({
    addAddressBool,
    editAddressBool,
    setAddAddress,
    setEditAddress,
    editAddresVals,
    patientId,
}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    //  --------------- State Variables ---------------
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")

    const [birthday, setBirthday] = useState()

    const [status, setStatus] = useState("")

    const [address, setAddress] = useState(editAddresVals?.address || "")
    const [city, setCity] = useState(editAddresVals?.city || "")
    const [state, setState] = useState(editAddresVals?.state || "")
    const [isCurrent, setIsCurrent] = useState(editAddresVals?.current)

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    // ------------ Slice of State Selectors -----------
    const current = useSelector(state => state.session.user)
    const allPatients = useSelector(state => state.patient.allPatients)
    const addresses = useSelector(state => state.patient.singlePatient.addresses)


    let addressCount = Object.values(addresses).filter(address => address.current === true).length


    //------------------- Use Effect -------------------
    useEffect(() => {
        // This useEffect is meant to help with error handling
        const errors = {};

        if (!addAddressBool && !editAddressBool && !firstName.length) errors["firstName"] = "First Name is Required"
        if (!addAddressBool && !editAddressBool && !lastName.length) errors["lastName"] = "Last Name is Required"

        if (!address.length) errors["address"] = "Address is Requried"

        if (!StatesList.includes(state)) errors["state"] = "Invalid State"
        if (!state.length) errors["state"] = "State is Required"
        // if (state.length !== 2) errors["state"] = "Invalid State"

        if (!city.length) errors["city"] = "City is Required"
        if (city.length < 3) errors["city"] = "Invalid City"
        if (city.length > 50) errors["city"] = "Invalid City"

        if (editAddressBool && !isCurrent && addressCount < 2) errors['current'] = "Must have at least one Current Address"

        if (!addAddressBool && !editAddressBool && !status) errors["status"] = "Invalid Status"
        if (!addAddressBool && !editAddressBool && !birthday) errors['birthday'] = "Birthday is required."
        if (!addAddressBool && !editAddressBool && new Date(birthday) > Date.now()) errors['birthday'] = "Invalid Birthday"

        setErrors(errors)


    }, [firstName, lastName, middleName, birthday, status, address, state, city, isCurrent])

    //  ------------- Submit Functionalities -------------
    const handleSubmit = async (e) => {
        // Meant for adding a new patient / their address
        e.preventDefault()

        // Once Submitted is true, Errors will show in their designated areas 
        // ** Will Note Proceed to Delete if there are error ***
        setSubmitted(true)
        if (Object.values(errors).length) return

        // Formats data to whatever it needs to look like 
        const patienFormData = new FormData()
        patienFormData.append('first_name', firstName)
        patienFormData.append('last_name', lastName)
        middleName && patienFormData.append('middle_name', middleName)
        patienFormData.append('date_of_birth', birthday)
        patienFormData.append('status_id', status)
        patienFormData.append("provider_id", current.id)

        const addressFormData = new FormData()
        addressFormData.append('address', address)
        addressFormData.append('state', state)
        addressFormData.append('city', city)
        addressFormData.append('isCurrent', true)

        const data = await dispatch(postNewPatientThunk(patienFormData, addressFormData))

        // console.log(data)
        if (data) {
            setErrors(data.errors)
            dispatch(getSinglePatientThunk(patientId))
        }
        else {
            closeModal()

        }
    }

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
            addAddressBool && setAddAddress(false)
            editAddressBool && setEditAddress(false)
            dispatch(getSinglePatientThunk(patientId))
        }
    }

    console.log(errors)
    //  ---------------- React Component -----------------
    return (
        <form onSubmit={handleSubmit}>

            {/* Logic if we are Adding an Address or a patient */}
            {/* Logic for Editting a Patient */}
            {addAddressBool ? "" :
                editAddressBool ? "" :
                    <>
                        <h3> Please enter the following information</h3>
                        {submitted && <span className='errors'>{errors.firstName}</span>}
                        <label >
                            First Name
                            <input
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </label>

                        {submitted && <span className='errors'>{errors.middleName}</span>}
                        <label >
                            <span>Middle Name <p>(optional)</p></span>
                            <input
                                type="text"
                                value={middleName}
                                onChange={e => setMiddleName(e.target.value)}
                            />
                        </label>

                        {submitted && <span className='errors'>{errors.lastName}</span>}
                        <label >
                            Last Name
                            <input
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </label>

                        {submitted && <span className='errors'>{errors.birthday}</span>}
                        <label >
                            Date of Birth
                            <input
                                type="date"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                            />
                        </label>

                        {submitted && <span className='errors'>{errors.status}</span>}
                        <label>
                            Status
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option default>Select a Staus</option>
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
            {!editAddressBool ?
                <h3> Please Enter Your Current Address</h3> :
                ""
            }

            {submitted && <span className='errors'>{errors.address}</span>}
            <label >
                Street
                <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </label>

            {submitted && <span className='errors'>{errors.city}</span>}
            <label >
                City
                <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </label>

            {submitted && <span className='errors'>{errors.state}</span>}
            <label>
                State
                <input
                    type="text"
                    value={state.toUpperCase()}
                    onChange={e => setState(e.target.value.toUpperCase())}
                />
            </label>

            {
                editAddressBool &&
                <>
                    {submitted && <span className='errors'>{errors.current}</span>}

                    <label>
                        Current
                        <input
                            type="checkbox"
                            value={isCurrent}
                            checked={isCurrent}
                            onChange={e => { setIsCurrent(!isCurrent) }}
                        />
                    </label>
                </>
            }

            {(addAddressBool || editAddressBool) ?
                <>
                    <button
                        onClick={handleAddressSubmit}
                    >
                        {addAddressBool ? "Add" : "Edit"}
                    </button>
                    <button
                        onClick={() => {
                            addAddressBool && setAddAddress(false)
                            editAddressBool && setEditAddress(false)
                        }}>
                        Cancel</button>
                </>
                : ""}

            {(!addAddressBool && !editAddressBool) &&
                <button type="submit">
                    Submit
                </button>
            }


        </form>
    )
}

export default AddPatientModal