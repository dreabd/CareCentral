// Function is used to go through the patinets arr and sort out which filters can be seleceted
export function validFiltersCreator(patients) {
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

export function priorityListPatients(patients) {
    let active = patients.filter((patient) => patient.status.toLowerCase() === "active")
    let onBoarding = patients.filter((patient) => patient.status.toLowerCase() === "onboarding")
    let inquiry = patients.filter((patient) => patient.status.toLowerCase() === "inquiry")
    let churned = patients.filter((patient) => patient.status.toLowerCase() === "churned")

    let priority_list = [...active, ...onBoarding, ...inquiry, ...churned]
    return priority_list
}

export function filterPatients(patients,filters,){
    let cities = filters?.city || []
    let states = filters?.state || []
    let statuses = filters?.status || []

    let filtered = patients

    if (cities.length) {
      filtered = filtered.filter((patient) => cities.includes(patient.addresses[0].city))
    }
    if (states.length) {
      filtered = filtered.filter((patient) => states.includes(patient.addresses[0].state))
    }
    if (statuses.length) {
      filtered = filtered.filter((patient) => statuses.includes(patient.status))
    }
    console.log("filtered......................",filtered)
    console.log("city......................",cities)
    console.log("state......................",states)
    console.log("status......................",statuses)
    return filtered
}