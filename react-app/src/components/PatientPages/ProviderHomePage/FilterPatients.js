import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../../OpenModalButton";

import SearchPatient from "./SearchPatient";

function validFiltersCreator(patients) {
    let validFilters = {
        "status": {},
        "city": {},
        "state": {}
    }

    for (let patient of patients) {
        let status = patient["status"]
        status in validFilters["status"] ? validFilters["status"][status] += 1 : validFilters["status"][status] = 1
        let state = patient['addresses'][0]['state']
        let city = patient['addresses'][0]['city']
        state in validFilters["state"] ? validFilters["state"][state] += 1 : validFilters["state"][state] = 1
        city in validFilters["city"] ? validFilters["city"][city] += 1 : validFilters["city"][city] = 1


    }

    return validFilters
}

function FilterPatients({ patients, setFilter, filters }) {
    const dispatch = useDispatch()

    //  --------------- State Variables ---------------
    const [statesDisp, setStateDisp] = useState(false)
    const [cityDisp, setCityDisp] = useState(false)
    const [stausDisp, setStatusDisp] = useState(false)

    //  ---------- Slice of State Selectors ----------
    let validFilters = validFiltersCreator(patients)

    /*
    Okay Hear me out so when I click on one of these checkboxes here is what will happen:
    - Set's a State Varibale with the Values of Whatever is Clicked 
    - Filters Patients with values that match that 
    - set Patients to the new filter array of patients  
    */


    const handleAddingFilter = (e) => {
        // When a check boxed in not checked this function will run and do the following:
        // - extract the filter and the value 
        // - use threaded filter prop and push to its appropiate key
        // - Set Filter to that new value 
        const [filter, value] = e.target.value.split(",");
        const updatedFilters = { ...filters };
        updatedFilters[filter].push(value);
        setFilter(updatedFilters);

    }
    const handleRemovingFilter = (e) => {
        const [filter, value] = e.target.value.split(",");
        const updatedFilters = { ...filters };
        updatedFilters[filter].splice(value, 1);
        setFilter(updatedFilters);
    }



    return (
        <div>
            {/* Would be in a line  */}
            <SearchPatient />
            <div>
                <button onClick={() => { setStateDisp(!statesDisp) }}>State</button>
                {/* Would Eventually Become Modals */}
                {statesDisp && Object.entries(validFilters.state).map(([state, count]) => {
                    return (
                        <label key={`${state}`} >
                            <input
                                type="checkbox"
                                value={["state", state]}
                                onChange={e => { !e.target.checked ? handleRemovingFilter(e) : handleAddingFilter(e) }}

                            />
                            {`${state}(${count})`}
                        </label>
                    )
                })}
            </div>
            <div>
                <button onClick={() => { setCityDisp(!cityDisp) }}>City</button>
                {/* Would Eventually Become Modals */}
                {cityDisp && Object.entries(validFilters.city).map(([city, count]) => {
                    return (
                        <label key={`${city}`} >
                            <input
                                type="checkbox"
                                value={["city", city]}
                                onChange={e => { !e.target.checked ? handleRemovingFilter(e) : handleAddingFilter(e) }}

                            />
                            {`${city}(${count})`}
                        </label>
                    )
                })}
            </div>
            <div>
                <button onClick={() => { setStatusDisp(!stausDisp) }}>Status</button>
                {/* Would Eventually Become Modals */}
                {stausDisp && Object.entries(validFilters.status).map(([status, count]) => {
                    // { status } :{count}
                    return (
                        <label key={`${status}`}>
                            <input
                                type="checkbox"
                                value={["status", status]}
                                onChange={e => { !e.target.checked ? handleRemovingFilter(e) : handleAddingFilter(e) }}
                            />
                            {`${status}(${count})`}
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default FilterPatients