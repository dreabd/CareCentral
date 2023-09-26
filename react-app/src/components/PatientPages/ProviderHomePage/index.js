// General Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Modals
import OpenModalButton from "../../OpenModalButton";
import AddPatientModal from "../AddPatientModal";

// Thunks
import { getAllPatientsThunk } from "../../../store/patient";

// Components
import FilterPatients from "./FilterPatients";
import PatientCard from "./PatientCard";

// CSS
import "./ProviderHomePage.css"

// Helpers
import { priorityListPatients } from "./helpers";

function ProviderHomePage() {
    const dispatch = useDispatch()

    // ---------------- State Variables----------------
    const [loading, setLoading] = useState(true)
    const [filters, setFilter] = useState({"status":[],"city":[],"state":[]})
    const [filteredPatients,setFilteredPatients] = useState([])

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

    let patients = priorityListPatients(Object.values(allPatients))
    if (loading) return "Loading Patients..."
    return (
        <div>
            <div>
                <p>{user.username}'s Patients</p>
            </div>
            <div>
                <FilterPatients
                    patients={!filteredPatients.length ? patients : filteredPatients}
                    setFilter={setFilter}
                    setFilteredPatients={setFilteredPatients}
                    filters={filters}
                />
            </div>
            <ul>
                <li>
                    <OpenModalButton
                        buttonText={<span><i class="icon-plus"></i> Add Member</span>}
                        modalComponent={<AddPatientModal />}
                    />
                </li>
                <PatientCard
                    patients={!filteredPatients.length ? patients : filteredPatients}
                    filters={filters}
                    filteredPatients={filteredPatients}
                />
            </ul>
        </div>
    )

}

export default ProviderHomePage
