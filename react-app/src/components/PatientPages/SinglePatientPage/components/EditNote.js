import AddNote from "./AddNote"

function EditNote({ setEditNote, edittedNote, patientId }) {
    return (
        <AddNote
            setEditNote={setEditNote}
            edittedNote={edittedNote}
            patientId={patientId}
        />
    )
}

export default EditNote
