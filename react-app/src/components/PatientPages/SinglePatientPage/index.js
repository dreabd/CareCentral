import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getSinglePatientThunk } from "../../../store/patient"

import PatientAddresses from "./components/PatientAddresses";
import PatientNotes from "./components/PatientNotes";
import AddNote from "./components/AddNote";
import AddAddress from "./components/AddAddress";
import PatientInfo from "./components/PatientInfo";
import Loading from "../../Loading";

import "./SinglePatient.css"
function SinglePatientPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()

    // ------------ Slice of State Selectors -----------
    const singlePatient = useSelector(state => state.patient.singlePatient)

    // ---------------- State Variables----------------
    const [loading, setLoading] = useState(true)
    const [addAddress, setAddAddress] = useState(false)
    const [addNote, setAddNote] = useState(false)

    //------------------- Use Effect -------------------
    useEffect(() => {
        dispatch(getSinglePatientThunk(id))

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [dispatch, id])

    if (loading) return <Loading/>
    if (!singlePatient.info.id) history.push("/")
    return (
        <div className="main-container">
            {/* General Information */}
            <div className="patient-info">
                <PatientInfo patient={singlePatient.info} />
            </div>

            <div className="address-notes-section">
                {/* Address */}
                <div className="address-section">
                    <h3> Addresss </h3>
                    <ul>
                        {Object.values(singlePatient.addresses)
                            .sort((a, b) => (a.current === b.current) ? 0 : a ? 1 : -1)
                            .map(address =>
                                <PatientAddresses
                                    address={address}
                                    patientId={singlePatient.info.id}
                                />)}
                        {/* Add Patient Address */}
                        {!addAddress ?
                            <button
                                className="form-button"
                                onClick={() => { setAddAddress(true) }}
                            >
                                <i class="icon-plus"></i> Add Patient Address
                            </button>
                            :
                            <AddAddress
                                setAddAddress={setAddAddress}
                                addAddress={addAddress}
                                patientId={singlePatient.info.id}
                            />
                        }

                    </ul>
                </div>

                {/* Notes */}
                <div className="notes-section">
                    <h3>Notes</h3>
                    <ul>
                        {
                            Object.values(singlePatient.notes).map(note =>
                                <PatientNotes
                                    note={note}
                                    patientId={singlePatient.info.id}
                                />
                            )
                        }
                        {/* Add Patient Note */}
                        {!addNote ?
                            <button
                                className="form-button"
                                onClick={() => { setAddNote(true) }}
                            >
                                <i class="icon-plus"></i> Add Patient Note
                            </button>

                            :

                            <AddNote
                                setAddNote={setAddNote}
                                patientId={singlePatient.info.id}
                            />
                        }
                    </ul>

                </div>

            </div>

        </div>

    )

}

export default SinglePatientPage
