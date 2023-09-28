import { useState, useEffect } from "react"

import EditAddress from "./EditAddress"
import OpenModalButton from "../../../OpenModalButton"


function PatientAddresses({ address, patientId }) {
    const [edit, setEdit] = useState(false)

    if (edit) return (
        <EditAddress
            edit={edit}
            setEdit={setEdit}
            address={address}
            patientId={patientId}

        />)

    return (
        <li style={{"listStyle":"none"}}key={`address${address.id}`} className="address-list-item">
            {/* Left side content */}
            <div className="address-left">
                <div className="address-details">
                    <p>Street: {address.address}</p>
                    <p>City: {address.city}</p>
                    <p>State: {address.state.toUpperCase()}</p>
                </div>
                {address.current ? (
                    <p>
                        <span className="green-dot"></span>Current
                    </p>
                ) : (
                    <p>
                        <span className="red-dot"></span>Not Current
                    </p>
                )}
            </div>

            {/* Right side content */}
            <div className="address-right">
                <button className="address-button" onClick={() => setEdit(true)}>
                    <i className="fas fa-edit"></i>
                </button>
                {/* <button className="address-button">
                    <i className="icon-trash"></i>
                </button> */}
            </div>
        </li>

    )

}

export default PatientAddresses