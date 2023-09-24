import { useState } from "react"
import { formatDate } from "./helpers"

function PatientNotes({notes}) {
    return notes.map((note) => {
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
                        <button>
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
    })
}

export default PatientNotes