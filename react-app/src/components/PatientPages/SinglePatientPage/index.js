import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSinglePatientThunk } from "../../../store/patient"

function SinglePatientPage() {
    const dispatch = useDispatch()
    const { id } = useParams()

    // ------------ Slice of State Selectors -----------
    const singlePatient = useSelector(state => state.patient.singlePatient)


    // ---------------- State Variables---------------- 
    const [loading, setLoading] = useState(true)

    //------------------- Use Effect -------------------
    useEffect(() => {
        dispatch(getSinglePatientThunk(id))
        
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }, [dispatch])


    if(loading) return "Loading Patient Information..."
    return (
        <div>
        </div>
    )

}

export default SinglePatientPage