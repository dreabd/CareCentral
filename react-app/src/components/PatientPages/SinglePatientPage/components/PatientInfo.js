import { formatDate } from "./helpers" 

function patientInfo(patient) {

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
 
        </div>
    )
}

export default patientInfo