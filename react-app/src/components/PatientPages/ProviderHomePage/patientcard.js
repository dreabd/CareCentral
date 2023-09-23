import { NavLink } from "react-router-dom";

export function patientCard(patients) {
    // priority: Active, On Boarding, Inquiry, Churned

    let active = patients.filter((patient) => patient.status.toLowerCase() === "active")
    let onBoarding = patients.filter((patient) => patient.status.toLowerCase() === "onboarding")
    let inquiry = patients.filter((patient) => patient.status.toLowerCase() === "inquiry")
    let churned = patients.filter((patient) => patient.status.toLowerCase() === "churned")

    let priority_list = [...active, ...onBoarding, ...inquiry, ...churned]

    return priority_list.map(patient => {
        return (
            <li>
                <NavLink to={`/patients/${patient.id}`}>
                    {/* left side */}
                    <div>
                        <p>{patient.first_name}, {patient.last_name} {patient.middle_name}</p>
                        <p>{patient.addresses[0].city} {patient.addresses[0].state}</p>
                    </div>
                    {/* right side */}
                    <div>
                        <p>
                            {patient.status}
                        </p>
                    </div>


                </NavLink>
            </li>
        )
    })
}