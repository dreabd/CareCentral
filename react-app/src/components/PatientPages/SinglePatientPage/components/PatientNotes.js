import { useState } from "react"
import { formatDate } from "./helpers"

import EditNote from "./EditNote"
import OpenModalButton from "../../../OpenModalButton"


function PatientNotes({ patientId, note }) {
    const [edit, setEdit] = useState(false)

    if (edit) return (
        <EditNote
            setEditNote={setEdit}
            edittedNote={note}
            patientId={patientId}
        />)


    return (
        <li style={{"listStyle":"none"}}key={`notes${note.id}`} className="notes-list-item">
            {/* Top section */}
            <div className="notes-top">
                {/* Left side of the top section */}
                <div className="notes-left">
                    <p className="note-title">{note.title}</p>
                    <p className="note-date">{formatDate(note.created_at)}</p>
                </div>

                {/* Right side of the top section */}
                <div className="notes-right">
                    <button className="notes-button" onClick={() => setEdit(true)}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button className="notes-button">
                        <i className="icon-trash"></i>
                    </button>
                </div>
            </div>

            {/* Bottom section */}
            <div className="notes-bottom">
                <p className="note-text">{note.text}</p>
            </div>
        </li>

    )

}

export default PatientNotes