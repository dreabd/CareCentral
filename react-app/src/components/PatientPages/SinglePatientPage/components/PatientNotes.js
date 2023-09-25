import { useState } from "react"
import { formatDate } from "./helpers"

import EditNote from "./EditNote"

function PatientNotes({ patientId, note }) {
    const [edit, setEdit] = useState(false)

    if (edit) return (
        <EditNote
            setEditNote={setEdit}
            edittedNote={note}
            patientId={patientId}
        />)


    return (
        <li key={`notes${note.id}`}>
            {/* Top */}
            <div>
                {/* Left */}
                <div>
                    <p>{note.title}</p>
                    <p>{formatDate(note.created_at)}</p>
                </div>
                {/* Right */}
                <div>
                    <button onClick={() => setEdit(true)}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button>
                        <i className="icon-trash"></i>
                    </button>
                </div>
            </div >

            {/* Bottom*/}
            < div >
                <p>{note.text}</p>
            </div >
        </li >
    )

}

export default PatientNotes