import { useState } from "react"
import { formatDate } from "./helpers"

import EditPatient from "./EditPatient"
import OpenModalButton from "../../../OpenModalButton"


function PatientInfo({ patient }) {
    const [edit, setEdit] = useState(false)

    if (edit) return (
        <EditPatient
            edit={edit}
            setEditPatient={setEdit}
            edittedPatient={patient}
            patientId={patient.id}
        />)

    return (
        <div className="patient-info-container">
            <div className="patient-name-section">
                <div className="patient-name">
                    <h3>
                        {patient.first_name}
                        {patient?.middle_name && ` ${patient.middle_name}`} {patient.last_name}
                    </h3>
                <div className="patient-status">{patient.status}</div>
                </div>
            </div>
            <div className="patient-dob-section">
                <p className="patient-dob-text">Date of Birth: {formatDate(patient.date_of_birth)}</p>
            </div>
            <button className="edit-button" onClick={() => setEdit(true)}>
                <i className="fas fa-edit"></i>
            </button>
        </div>
    )
}

export default PatientInfo
