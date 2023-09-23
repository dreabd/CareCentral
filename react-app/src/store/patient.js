import { normalizeObj } from './helpers';

//--------------------- Type Variables ---------------------
const GET_ALL_PATIENTS = 'patients/getAllPatients'
const GET_SINGLE_PATIENT = 'patients/getSinglePatient'
const POST_NEW_PATIENT = 'patients/postNewPatient'

//--------------------- Action Creators --------------------
const getAllPatients = (patients) =>{
    return{ 
        type: GET_ALL_PATIENTS,
        patients
    }
}

const getSinglePatient = (patient,addresses,notes) =>{
    return{
        type: GET_SINGLE_PATIENT,
        patient,
        addresses,
        notes,
    }
}

const postNewPatient = (patient) =>{
    return{
        type:POST_NEW_PATIENT,
        patient
    }
}

//------------------------- THUNK --------------------------
export const getAllPatientsThunk = () => async (dispatch) => {
    const res = await fetch("/api/patients/")

    if(res.ok){
        const { patients } = await res.json()
        dispatch(getAllPatients(patients))
        return
    } else{
        console.log("Problem loading all patients")
    }
}

export const getSinglePatientThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/patients/${id}`)

    if(res.ok){
        const { patient } = await res.json()
        const { addresses, notes} = patient
        delete patient.addresses
        delete patient.notes 
        dispatch(getSinglePatient(patient,addresses,notes))
        return
    } else{
        console.log("Problem loading all patients")
    }
}

export const postNewPatientThunk = (newPatient) => async (dispatch) =>{
    console.log("Form Data gathered from create card form:")
    for (let key of newPatient.entries()) {
        console.log(key[0] + ' ----> ' + key[1])
    }

    const res = await fetch(`/api/patients`,{
        method: "POST",
        body: newPatient
    })

    if (res.ok) {
        const { new_patient } = await res.json()
        dispatch(postNewPatient(new_patient))
        return
    } else {
        const { errors } = await res.json()
        return errors
    }

}



//---------------------- Initial State ---------------------
const initialState = {
    allPatients:{},
    singlePatient:{
        info:{},
        notes:{},
        addresses:{},
    },
};

//------------------------- Reducer  -----------------------
const patient = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_PATIENTS:
            return {...state, allPatients:{...normalizeObj(action.patients)}}
        case GET_SINGLE_PATIENT:
            return{...state, 
                singlePatient:{
                    info:{...action.patient},
                    notes:{...normalizeObj(action.notes)},
                    addresses:{...normalizeObj(action.addresses)}
                }}
        case POST_NEW_PATIENT:
            newState = {...state}
            newState.allPatients[action.newPatient.id] = action.newPatient
            return newState

        default:
            return state;
  }
};

export default patient;
