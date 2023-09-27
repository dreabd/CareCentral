import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import { postPatientNoteThunk, putPatientNoteThunk } from "../../../../store/patient"

function AddNote({
    patientId,
    // Props for Adding Note
    setAddNote,
    // Props for Editting Note
    setEditNote,
    edittedNote,
    intialNote,
    // Props for Adding an Intial Note
    noteList,
    index,
    handleNoteListRemove,
    handleNoteListChange,
}) {
    // Need prop thread patient ID
    const dispatch = useDispatch()

    //  --------------- State Variables ---------------
    const [title, setTitle] = useState(edittedNote?.title || "")
    const [text, setText] = useState(edittedNote?.text || "")

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    //------------------- Use Effect -------------------
    useEffect(() => {
        // This uesEffect is meant to help with error handling
        const errors = {}

        if (title.length > 100) errors["title"] = "Title must be under 100 characthers"
        if (!text.trim().length) errors["text"] = "Text is Required"

        setErrors(errors)

    }, [text, title])

    //  ------------- Submit Functionalities -------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)
        if (Object.values(errors).length) return

        const noteData = new FormData()
        noteData.append("title", title)
        noteData.append("text", text)

        const data = await
            (edittedNote ?
                dispatch(putPatientNoteThunk(patientId, edittedNote.id, noteData))
                :
                dispatch(postPatientNoteThunk(patientId, noteData)))
        if (data) {
            setErrors(data.errors)
        } else {
            // Since we are reusing this component for both the add and edit
            //  - We need this logic to determine which one to set to false
            //  - setting to false therfore changes the input to whatever it's supposed to be
            edittedNote ? setEditNote(false) : setAddNote(false)
        }
    }


    return (
        <div className={`${noteList ? "" : "input-form-container"}`}>
            {submitted && <span className="error-message">{errors.title}</span>}
            <label >
                Title
                <input
                    className="form-input"
                    name="title"
                    type="text"
                    value={noteList ? intialNote.title : title}
                    onChange={(e) => {
                        !noteList && setTitle(e.target.value)
                        noteList && handleNoteListChange(e, index)
                    }
                    }
                />
            </label>

            {submitted && <span className='error-message'>{errors.text}</span>}
            <label >
                Text
                <input
                    className="form-input"
                    name="text"
                    type="text"
                    value={noteList ? intialNote.text : text}
                    onChange={(e) => {
                        !noteList && setText(e.target.value)
                        noteList && handleNoteListChange(e, index)
                    }}
                />
            </label>

            <div className="button-container">
                {!noteList &&
                    <button
                        className="form-button"
                        onClick={handleSubmit} type="submit">
                        {edittedNote ? "Edit" : "Add"}
                    </button>
                }
                <button
                    className="form-button"
                    onClick={() => {
                        edittedNote && setEditNote(false)
                        !noteList && !edittedNote && setAddNote(false)
                        noteList && handleNoteListRemove(index)
                    }
                    }>{noteList ? "Remove" : "Cancel"}
                </button>

            </div>
        </div>
    )
}

export default AddNote
