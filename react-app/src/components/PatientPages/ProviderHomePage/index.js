// General Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Modals
import OpenModalButton from "../../OpenModalButton";
import AddPatientModal from "../AddPatientModal";

// Thunks
import { getAllPatientsThunk } from "../../../store/patient";

// Helpers
import { patientCard } from "./patientcard";

function ProviderHomePage() {
    const dispatch = useDispatch()

    // ---------------- State Variables----------------
    const [loading, setLoading] = useState(true)

    // ------------ Slice of State Selectors -----------
    const allPatients = useSelector(state => state.patient.allPatients)
    const user = useSelector(state => state.session.user)
    
    //------------------- Use Effect -------------------
    useEffect(() => {
        dispatch(getAllPatientsThunk())

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [dispatch])


    if (loading) return "Loading Patients..."
    return (
        <div>
            <div>
                <p>{user.username}'s Patients</p>
            </div>
            <ul>
                <li>
                    <OpenModalButton
                        buttonText={<span><i class="icon-plus"></i> Add Member</span>}
                        modalComponent={<AddPatientModal/>}
                    />
                </li>
                {patientCard(Object.values(allPatients))}
            </ul>
        </div>
    )

}

export default ProviderHomePage
