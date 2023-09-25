import { useState } from "react"
import { formatDate } from "./helpers"

import EditPatient from "./EditPatient"

function PatientInfo({patient}) {
    const [edit, setEdit] = useState(false)

    if (edit) return (
        <EditPatient
            edit={edit}
            setEditPatient={setEdit}
            edittedPatient={patient}
            patientId={patient.id}
        />)

    return (
        <div>
            {/* Patient Name on Top */}
            <div>
                <h3>{patient.first_name}{patient?.middle_name && ` ${patient.middle_name}`} {patient.last_name}</h3>
                <p>{patient.status}</p>
            </div>
            {/* Patient DOB */}
            <div>
                <p>Date of Birth: {formatDate(patient.date_of_birth)}</p>
            </div>
            <button onClick={() => setEdit(true)}>
                <i className="fas fa-edit"></i>
            </button>
        </div>
    )
}

export default PatientInfo
