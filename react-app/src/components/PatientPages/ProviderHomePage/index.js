import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPatientsThunk } from "../../../store/patient";

import { patientCard } from "./patientcard";

function ProviderHomePage() {
    const dispatch = useDispatch()

    // ------------ Slice of State Selectors -----------
    const allPatients = useSelector(state => state.patient.allPatients)


    // ---------------- State Variables---------------- 
    const [loading, setLoading] = useState(true)

    //------------------- Use Effect -------------------
    useEffect(() => {
        dispatch(getAllPatientsThunk())
        
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }, [dispatch])


    if(loading) return "Loading Patients..."
    return (
        <div>
            <ul>
                {patientCard(Object.values(allPatients)) }
            </ul>
        </div>
    )

}

export default ProviderHomePage