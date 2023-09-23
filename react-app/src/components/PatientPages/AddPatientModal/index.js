import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import { postNewPatientThunk } from "../../../store/patient";

function AddPatientModal() {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    //  --------------- State Variables ---------------
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")

    const [birthday, setBirthday] = useState()

    const [status, setStatus] = useState("")

    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    // ------------ Slice of State Selectors -----------
    const current = useSelector(state => state.session.user)

    //------------------- Use Effect -------------------
    useEffect(() => {
        const errors = {};

        if (!firstName.length) errors["firstName"] = "First Name is Required"
        if (!lastName.length) errors["lastName"] = "Last Name is Required"

        if (!status) errors["status"] = "Invalid Status"
        if (!birthday) errors['birthday'] = "Birthday is required."
        if (new Date(birthday) > Date.now()) errors['birthday'] = "Invalid Birthday"
        setErrors(errors)
    }, [firstName, lastName, middleName, birthday, status])

    //  ------------- Submit Functionalities -------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)
        if (Object.values(errors).length) return

        // Formats data to whatever it needs to look like 
        const formData = new FormData()
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('middle_name', middleName)
        formData.append('date_of_birth', birthday)
        formData.append('status_id', status)
        formData.append("provider_id",current.id)

        const data = await dispatch(postNewPatientThunk(formData))
        console.log(data)
        if(data["errors"]){
            setErrors(data.errors)
        }
        // else{
        //     closeModal()
        // }
    }


    return (
        <form onSubmit={handleSubmit}>
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
                Middle Name
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

            <button type="submit">
                Submit
            </button>

        </form>
    )
}

export default AddPatientModal