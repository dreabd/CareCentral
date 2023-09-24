import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import { postPatientNoteThunk,putPatientNoteThunk } from "../../../../store/patient"

function AddNote({
    setAddNote,
    setEditNote,
    edittedNote,
    patientId,
}) {
    // Need prop thread patient ID
    const dispatch = useDispatch()

    //  --------------- State Variables ---------------
    const [title, setTitle] = useState(edittedNote?.title || "")
    const [text, setText] = useState(edittedNote?.text || "")

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    //------------------- Use Effect -------------------
    useEffect(()=>{
        // This uesEffect is meant to help with error handling
        const errors = {}

        if(title.length > 100) errors["title"] = "Title must be under 100 characthers"
        if(!text.trim().length) errors["text"] = "Text is Required"

        setErrors(errors)

    },[text,title])

    //  ------------- Submit Functionalities -------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)
        if(Object.values(errors).length) return

        const noteData = new FormData()
        noteData.append("title",title)
        noteData.append("text",text)

        const data = dispatch(postPatientNoteThunk(patientId,noteData))

        if (data){
            setErrors(data.errors)
        } else{
            setAddNote(false)
        }
    }

    console.log(errors)

    return (
        <form onSubmit={handleSubmit}>
            {/* {submitted && <span className='errors'>{errors.title}</span>} */}
            <label >
                Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            {/* {submitted && <span className='errors'>{errors.text}</span>} */}
            <label >
                Text
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </label>

            <button type="submit">Add</button>
            <button onClick={() => setAddNote(false)}>Cancel</button>
        </form>
    )
}

export default AddNote
