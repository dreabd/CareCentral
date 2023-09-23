import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSinglePatientThunk } from "../../../store/patient"

import patientInfo from "./PatientInfo";
import patientAddresses from "./PatientAddresses";
import patientNotes from "./PatientNotes";

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

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [dispatch, id])


    if (loading) return "Loading Patient Information..."
    return (
        <div>
            {/* General Information */}
            <div>
                {patientInfo(singlePatient.info)}
            </div>

            {/* Address */}
            <div>
                <h3>
                    Addresses:
                </h3>
                <ul>
                    {patientAddresses(Object.values(singlePatient.addresses))}
                </ul>
            </div>

            {/* Notes */}
            <div>
                <h3>
                    Notes
                </h3>
                <ul>
                    {patientNotes(Object.values(singlePatient.notes))}
                </ul>

            </div>
        </div>
    )

}

export default SinglePatientPage