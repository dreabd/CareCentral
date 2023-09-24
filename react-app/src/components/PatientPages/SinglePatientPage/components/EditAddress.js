import { useState } from "react";

import AddPatientModal from "../../AddPatientModal";

function EditAddress({ edit, setEdit, address }) {
    return (
        <AddPatientModal
            editAddressBool = {edit}
            setEditAddress = {setEdit}
            editAddresVals = {address}
        />
    )
}

export default EditAddress