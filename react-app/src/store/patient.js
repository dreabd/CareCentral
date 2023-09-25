import { normalizeObj } from './helpers';

//--------------------- Type Variables ---------------------
const GET_ALL_PATIENTS = 'patients/getAllPatients'
const GET_SINGLE_PATIENT = 'patients/getSinglePatient'
const POST_NEW_PATIENT = 'patients/postNewPatient'

const POST_PATIENT_ADDRESS = 'patients/postPatientAddress'
const PUT_PATIENT_ADDRESS = "patients/putPatientAddresss"

const POST_PATIENT_NOTE = "patients/postPatientNote"
const PUT_PATIENT_NOTE = "patients/putPatientNote"

//--------------------- Action Creators --------------------
const getAllPatients = (patients) => {
    return {
        type: GET_ALL_PATIENTS,
        patients
    }
}

const getSinglePatient = (patient, addresses, notes) => {
    return {
        type: GET_SINGLE_PATIENT,
        patient,
        addresses,
        notes,
    }
}

const postPatientAddress = (address) => {
    return {
        type: POST_PATIENT_ADDRESS,
        address
    }
}

const putPatientAddresss = (address) => {
    return {
        type: PUT_PATIENT_ADDRESS,
        address
    }
}

const postPatientNote = (note) => {
    return {
        type: POST_PATIENT_NOTE,
        note
    }
}

const putPatientNote = (note) => {
    return {
        type: PUT_PATIENT_NOTE,
        note
    }
}

//------------------------- THUNK --------------------------

// -------------- Patient Related --------------
export const getAllPatientsThunk = () => async (dispatch) => {
    const res = await fetch("/api/patients/")

    if (res.ok) {
        const { patients } = await res.json()
        dispatch(getAllPatients(patients))
        return
    } else {
        console.log("Problem loading all patients")
    }
}

export const getSinglePatientThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/patients/${id}`)

    if (res.ok) {
        const { patient } = await res.json()
        const { addresses, notes } = patient
        delete patient.addresses
        delete patient.notes
        dispatch(getSinglePatient(patient, addresses, notes))
        return
    } else {
        console.log("Problem loading all patients")
    }
}



export const postNewPatientThunk = (newPatient, newAddress, noteListFormData) => async (dispatch) => {
    console.log("Form Data gathered from create card form:")
    for (let key of newPatient.entries()) {
        console.log(key[0] + ' ----> ' + key[1])
    }
    const res = await fetch(`/api/patients/`, {
        method: "POST",
        body: newPatient
    })

    if (res.ok) {
        const { new_patient } = await res.json()
        dispatch(postPatientAddressThunk(new_patient.id, newAddress))

        noteListFormData.forEach( newNote =>{
            dispatch(postPatientNoteThunk(new_patient.id,newNote))
        })
    } else {
        const { errors } = await res.json()
        return errors
    }

}


// -------------- Address Related --------------
export const postPatientAddressThunk = (patientId, newAddress) => async (dispatch) => {
    const res = await fetch(`/api/patients/${patientId}/address`, {
        method: "POST",
        body: newAddress
    })

    if (res.ok) {
        const { newAddress } = await res.json()
        dispatch(postPatientAddress(newAddress))
        dispatch(getAllPatientsThunk())
        return
    } else {
        const { errors } = await res.json()
        return errors
    }
}

export const putPatientAddresssThunk = (patientId, addressId, edittedAddress) => async (dispatch) => {

    const res = await fetch(`/api/patients/${patientId}/address/${addressId}`, {
        method: "PUT",
        body: edittedAddress
    })

    if (res.ok) {
        const { edittedAddress } = await res.json()
        dispatch(putPatientAddresss(edittedAddress))
        // dispatch(getSinglePatientThunk(patientId))
        return
    } else {
        const { errors } = await res.json()
        return errors
    }
}

// -------------- Note Related --------------
export const postPatientNoteThunk = (patientId, newNote) => async (dispatch) => {
    const res = await fetch(`/api/patients/${patientId}/note`, {
        method: "POST",
        body: newNote
    })

    if (res.ok) {
        const { newNote } = await res.json()

        dispatch(postPatientNote(newNote))
        return
    } else {
        const { errors } = await res.json()
        return errors
    }
}

export const putPatientNoteThunk = (patientId, noteId, edittedNote) => async (dispatch) => {
    const res = await fetch(`/api/patients/${patientId}/note/${noteId}`, {
        method: "PUT",
        body: edittedNote
    })

    if (res.ok) {
        const { edittedNote } = await res.json()
        dispatch(putPatientNote(edittedNote))
        return
    } else {
        const { errors } = await res.json()
        return errors
    }
}




//---------------------- Initial State ---------------------
const initialState = {
    allPatients: {},
    singlePatient: {
        info: {},
        notes: {},
        addresses: {},
    },
};

//------------------------- Reducer  -----------------------
const patient = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        // -------------- Patient Related --------------
        case GET_ALL_PATIENTS:
            return { ...state, allPatients: { ...normalizeObj(action.patients) } }
        case GET_SINGLE_PATIENT:
            return {
                ...state,
                singlePatient: {
                    info: { ...action.patient },
                    notes: { ...normalizeObj(action.notes) },
                    addresses: { ...normalizeObj(action.addresses) }
                }
            }


        // -------------- Address Related --------------
        case POST_PATIENT_ADDRESS:
            newState = { ...state }
            console.log(newState)
            newState.singlePatient.addresses[action.address.id] = action.address
            console.log(newState)
            return newState

        case PUT_PATIENT_ADDRESS:
            let addresses = { ...state.singlePatient.addresses }
            addresses[action.address.id] = action.address
            return {
                ...state,
                singlePatient: {
                    ...state.singlePatient,
                    addresses: { ...addresses }
                }
            };

        // -------------- Notes Related --------------

        case POST_PATIENT_NOTE:
            newState = { ...state }
            newState.singlePatient.notes[action.note.id] = action.note
            return newState

        case PUT_PATIENT_NOTE:
            let notes = { ...state.singlePatient.notes }
            notes[action.note.id] = action.note
            return {
                ...state,
                singlePatient: {
                    ...state.singlePatient,
                    notes: { ...notes }
                }
            };


        default:
            return state;
    }
};

export default patient;
