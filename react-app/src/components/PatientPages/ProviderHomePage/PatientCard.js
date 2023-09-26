import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState for local state

function PatientCard({ patients}) {

  return patients.map((patient) => {
    return (
      <li
        key={`${patient.id}`}
        className={`patient-card ${patient.status === 'inquiry' || patient.status === 'onboarding'
            ? 'status-inquiry'
            : patient.status === 'active'
              ? 'status-active'
              : patient.status === 'churned'
                ? 'status-churned'
                : ''
          }`}>
        {/* left side */}
        <div className="patient-info">
          <NavLink to={`/patients/${patient.id}`}>
            <p className="patient-name">
              {patient.last_name}
              {patient?.middle_name && ` ${patient.middle_name}`}, {patient.first_name}
            </p>
          </NavLink>
          <p className="patient-address">
            {patient.addresses[0].city} {patient.addresses[0].state}
          </p>
        </div>
        {/* right side */}
        <div className="patient-status">
          <p>{patient.status}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="patient-grid">
      {cards}
    </div>
  )
}

export default PatientCard;

// useEffect(() => {
//   // ----- Helper for Filtering -----
//   function filterPatients(priority_list, filters) {
//     let cities = filters?.city || [];
//     let states = filters?.state || [];
//     let statuses = filters?.status || [];

//     let filtered = priority_list;

//     if (cities.length) {
//       filtered = filtered.filter((patient) => cities.includes(patient.addresses[0].city));
//     }
//     if (states.length) {
//       filtered = filtered.filter((patient) => states.includes(patient.addresses[0].state));
//     }
//     if (statuses.length) {
//       filtered = filtered.filter((patient) => statuses.includes(patient.status));
//     }

//     return filtered;
//   }

//   // Update the local state
//   const updatedFilteredPatients = filterPatients(patients, filters);
//   setPatientCards(updatedFilteredPatients)
//   setFilteredPatients(updatedFilteredPatients)
// }, [patients, filters]); // Add dependencies for the useEffect
