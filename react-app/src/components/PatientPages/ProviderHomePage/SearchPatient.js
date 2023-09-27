import { React, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { getPatientsSearchThunk,getAllPatientsThunk} from '../../../store/patient';

function SearchPatient() {
    const dispatch = useDispatch()
    const history = useHistory()

    // ---------------- State Variables----------------
    const [search, setSearch] = useState("")

    return (
        <div className='search-bar-container'>
            <input
                type='search'
                className='search-bar'
                placeholder='Search for Patients'
                onChange={async (e) => {
                    setSearch(e.target.value)
                }}
                onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                        search.length ?
                            await dispatch(getPatientsSearchThunk(search)) :
                            await dispatch(getAllPatientsThunk())
                        history.push("/")
                    }
                }}
            />
            {/* dispatch the search thunk here, passing it e.target.value */}
            <button className='search-button'
                onClick={async (e) => {
                    search.length ?
                        await dispatch(getPatientsSearchThunk(search)) :
                        await dispatch(getAllPatientsThunk())
                    history.push("/")
                }}>
                <i class="icon-search"></i>
            </button>
        </div>
    )
}

export default SearchPatient