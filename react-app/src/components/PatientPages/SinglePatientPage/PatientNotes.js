import { formatDate } from "./helpers"

function patientNotes(notes) {
    return notes.map((note) => {
        return (
            <li>
                {/* Top */}
                <div>
                    <p>{note.title}</p>
                    <p>{formatDate(note.created_at)}</p>
                </div>

                {/* Bottom*/}
                <div>
                    <p>{note.text}</p>
                </div>
            </li>
        )
    })
}

export default patientNotes