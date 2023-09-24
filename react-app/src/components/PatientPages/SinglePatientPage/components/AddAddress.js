import AddPatientModal from "../../AddPatientModal";

function AddAddress({patientId,addAddress,setAddAddress}) {

    return (
        <AddPatientModal
            setAddAddress={setAddAddress}
            addAddressBool={addAddress}
            patientId={patientId} 
            />
    )
}

export default AddAddress