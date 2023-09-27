import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../../OpenModalButton";

import SearchPatient from "./SearchPatient";

import { validFiltersCreator, filterPatients,priorityListPatients } from "./helpers";

function FilterPatients({ patients, setFilter, filters, setFilteredPatients }) {
    const dispatch = useDispatch()

    //  --------------- State Variables ---------------
    const [statesDisp, setStateDisp] = useState(false)
    const [cityDisp, setCityDisp] = useState(false)
    const [stausDisp, setStatusDisp] = useState(false)


    //  ---------- Slice of State Selectors ----------
    const allPatients = useSelector(state => state.patient.allPatients)
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
        const [filter, value] = e.target.value.split(",")
        const updatedFilters = { ...filters }
        updatedFilters[filter].push(value)
        setFilter(updatedFilters)
        setFilteredPatients(filterPatients(patients, filters))
    }

    const handleRemovingFilter = (e) => {
        const [filter, value] = e.target.value.split(",")
        const updatedFilters = { ...filters }
        updatedFilters[filter].splice(value, 1)
        setFilter(updatedFilters)
        // Okay so this one is kinda hacky,
        // - IF THERE ARE FILTERS 
        if (Object.values(filters).flat().length) {
            // -- Will filter patients based off of those filter and send it to the patient cards
            setFilteredPatients(filterPatients(patients, filters))
            // - OTHERWISE / ELSE
        } else {
            // - Will return all patients from slice of state
            setFilteredPatients(priorityListPatients(Object.values(allPatients)))
        }


    }

    const toggleDropdown = (stateSetter) => {
        stateSetter((prevState) => !prevState);
    };

    const handClosingDispays = (dispFunction, dispBool) => {
        if (!dispBool) {
            dispFunction(!dispBool)
        } else {
            setFilteredPatients(priorityListPatients(Object.values(allPatients)))
            dispFunction(!dispBool)
        }
    }

    return (
        <div>
            {/* Would be in a line  */}
            <div className="filter-container">
                <div>
                    <button
                        className={`filter-button ${statesDisp ? "active" : ""}`}
                        onClick={() => {
                            toggleDropdown(setStateDisp)
                            handClosingDispays(setStateDisp, statesDisp)
                        }}
                    >
                        State
                    </button>
                    {/* Dropdown content */}
                    <div className="filter-dropdown-content">
                        {statesDisp && Object.entries(validFilters.state).map(([state, count]) => {
                            return (
                                <label key={`${state}`}>
                                    <input
                                        type="checkbox"
                                        value={["state", state]}
                                        onChange={(e) => {
                                            !e.target.checked ? handleRemovingFilter(e) : handleAddingFilter(e);
                                        }}
                                    />
                                    {`${state}(${count})`}
                                </label>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <button
                        className={`filter-button ${cityDisp ? "active" : ""}`}
                        onClick={() => {
                            toggleDropdown(setCityDisp)
                            handClosingDispays(setCityDisp, cityDisp)
                        }}
                    >
                        City
                    </button>
                    {/* Dropdown content */}
                    <div className="filter-dropdown-content">
                        {cityDisp && Object.entries(validFilters.city).map(([city, count]) => {
                            return (
                                <label key={`${city}`}>
                                    <input
                                        type="checkbox"
                                        value={["city", city]}
                                        onChange={(e) => {
                                            !e.target.checked ? handleRemovingFilter(e) : handleAddingFilter(e);
                                        }}
                                    />
                                    {`${city}(${count})`}
                                </label>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <button
                        className={`filter-button ${stausDisp ? "active" : ""}`}
                        onClick={() => {
                            toggleDropdown(setStatusDisp)
                            handClosingDispays(setStatusDisp, stausDisp)
                        }}
                    >
                        Status
                    </button>
                    {/* Dropdown content */}
                    <div className="filter-dropdown-content">
                        {stausDisp && Object.entries(validFilters.status).map(([status, count]) => {
                            return (
                                <label key={`${status}`}>
                                    <input
                                        type="checkbox"
                                        value={["status", status]}
                                        onChange={(e) => {
                                            !e.target.checked ? handleRemovingFilter(e) : handleAddingFilter(e);
                                        }}
                                    />
                                    {`${status}(${count})`}
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FilterPatients