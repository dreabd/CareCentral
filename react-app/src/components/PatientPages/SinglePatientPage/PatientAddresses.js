function patientAddresses(addresses) {
    return addresses.sort((a,b)=>(a.current === b.current)? 0 : a? -1 : 1).map((address) => {
        return (
            <li key={`address${address.id}`}>
                <div>
                    <p>Street: {address.address}</p>
                    <p>city: {address.city}</p>
                    <p>state: {address.state}</p>

                </div>
                <div>
                    {/* logic to show a green dot if current red dot if not current  */}
                    <p>{address.current ? "Current" : "Past"}</p>
                </div>
            </li>)
    })
}

export default patientAddresses