function AddNote({ setAddNote, editNote }) {
    return (
        <form >
            <label >
                Title
                <input
                    type="text"
                />
            </label>
            <label >
                Text
                <input
                    type="text"
                />
            </label>

            <button onClick={() => setAddNote(false)}>Cancel</button>
            <button>Add</button>
        </form>
    )
}

export default AddNote