import { normalizeObj } from './helpers';

//--------------------- Type Variables ---------------------
const GET_ALL_PATIENTS = 'patients/getAllPatients'
const GET_SINGLE_PATIENT = 'patients/getSinglePatient'
const POST_NEW_PATIENT = 'patients/postNewPatient'

const POST_PATIENT_ADDRESS = 'patients/postPatientAddress'
const PUT_PATIENT_ADDRESS = "patients/putPatientAddresss"

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


//------------------------- THUNK --------------------------
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



export const postNewPatientThunk = (newPatient, newAddress) => async (dispatch) => {
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
    } else {
        const { errors } = await res.json()
        return errors
    }

}

export const postPatientAddressThunk = (patientId, newAddress) => async (dispatch) => {
    const res = await fetch(`/api/patients/${patientId}/address`, {
        method: "POST",
        body: newAddress
    })

    if (res.ok) {
        const { newAddress } = await res.json()
        dispatch(getAllPatientsThunk())
        return
    } else {
        const { errors } = await res.json()
        return errors
    }
}

export const postPatientNoteThunk = (patientId,newNote) => async(dispatch) =>{
    const res = await fetch(`/api/patients/${patientId}/note`, {
        method: "POST",
        body: newNote
    })

    if (res.ok) {
        const { newNote } = await res.json()
        dispatch(getAllPatientsThunk())
        return
    } else {
        const { errors } = await res.json()
        return errors
    }
}

export const putPatientAddresssThunk = (patientId, addressId, edittedAddress) => async (dispatch) => {
    console.log("Form Data gathered from create card form:")
    for (let key of edittedAddress.entries()) {
        console.log(key[0] + ' ----> ' + key[1])
    }
    const res = await fetch(`/api/patients/${patientId}/address/${addressId}`, {
        method: "PUT",
        body: edittedAddress
    })

    if (res.ok) {
        const { edittedAddress } = await res.json()
        return
    } else {
        const { errors } = await res.json()
        return errors
    }
}

export const putPatientNoteThunk = (patientId,noteId,eddittedNote) => async (dispatch) =>{
    const res = await fetch(`/api/patients/${patientId}/notes/${noteId}`,{
        method: "PUT",
        body: eddittedNote
    })


    if (res.ok) {
        const { edittedNote } = await res.json()
        return 
    } else {
        const { errors } = await res.json()
        return errors
    }}




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

        default:
            return state;
    }
};

export default patient;
