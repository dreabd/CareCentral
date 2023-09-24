import { useState, useEffect } from "react"

import EditAddress from "./EditAddress"

function PatientAddresses({ address }) {
    const [edit, setEdit] = useState(false)

    if (edit) return (
        <EditAddress
            edit={edit}
            setEdit={setEdit}
            address={address} />)
            
    return (
        <li key={`address${address.id}`}>
            {/* left */}
            <div>
                <p>Street: {address.address}</p>
                <p>city: {address.city}</p>
                <p>state: {address.state.toUpperCase()}</p>
                {/* logic to show a green dot if current red dot if not current  */}
                <p>{address.current ? "Current" : ""}</p>

            </div>

            {/* Right */}
            <div>
                <div>
                    <button onClick={() => setEdit(true)}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button>
                        <i className="icon-trash"></i>
                    </button>
                </div>
            </div>


        </li>
    )

}

export default PatientAddresses