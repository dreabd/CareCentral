import { useState } from "react";

import AddPatientModal from "../../AddPatientModal";

function EditAddress({ patientId,edit, setEdit, address }) {
    return (
        <AddPatientModal
            editAddressBool = {edit}
            setEditAddress = {setEdit}
            editAddresVals = {address}
            patientId={patientId}

        />
    )
}

export default EditAddress