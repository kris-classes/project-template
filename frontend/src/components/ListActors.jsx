import React, { useState, useEffect } from 'react'

// This is a React component (note the .jsx extension)
export default function ListActors() {
    const [ initialActorsList, setInitialActorsList ] = useState([])  // Create an empty 'initialActorsList' used for the initial unfiltered fetch.
    const [ filteredActorsList, setFilteredActorsList ] = useState([])  // Use a 2nd variable for the filtered actors list.
    const [ searchText, setSearchText ] = useState('')  // Used to store the search box text


    // The useEffect function is run when the component is loaded.
    useEffect(() => {
        // Create a function which will fetch the actors list as soon as the component is loaded.
        async function fetchInitialActorsList() {
            const response = await fetch("http://localhost:8000/actors")
            const responseData = await response.json()
            // Set both here. Filtered Actors List starts off unfiltered.
            setInitialActorsList(responseData['actors'])
            setFilteredActorsList(responseData['actors'])
        }
        // Run the above function.
        fetchInitialActorsList()
    }, [])

    function searchActorList(e) {  // e is short for "event", it contains a bunch of stuff (add console.log(e) if you want to see it)
        const { value } = e.target  // Extract the value from the event and store it in a constant called "value".
        // Log to console the character that was pressed.
        console.log(`Character typed was: ${value}`)
        // Use the "filter" function on the actors list to return only the rows where either the first or lastname start with the character typed.
        const filteredList = initialActorsList.filter(row => (row[1].startsWith(value.toUpperCase()) || row[2].startsWith(value.toUpperCase())))
        console.log(filteredList)  // Log out the filtered list for debug purposes.
        setSearchText(value)  // Tell React that the searchText was changed and it needs to update the component.
        setFilteredActorsList(filteredList)  // Tell React the Filtered Actors List was changed and it needs to update the component.
    }

    return (
        <>
            <h1>List of Actors</h1>
            <br />
            <p>Search Text: {searchText}</p>
            <input placeholder="Search for actor by name" value={searchText} onChange={(char) => searchActorList(char)} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                {filteredActorsList.map((actor, idx) => (
                    <tr key={idx}>
                        <td>{actor[0]}</td>
                        <td>{actor[1]}</td>
                        <td>{actor[2]}</td>
                        <td>{actor[3]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <a href="/">Click here to go back to index.</a>
        </>
    )
}