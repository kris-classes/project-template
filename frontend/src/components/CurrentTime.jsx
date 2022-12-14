import React, { useState, useEffect } from 'react'

export default function Time() {
    const [ currentTime, setCurrentTime ] = useState('')

    useEffect(() => {
        async function getTime() {  // e is short for "event", we're not using it here though.
            const response = await fetch("http://localhost:8000/time")  // fetch the latest time from the API
            const responseData = await response.json()  // convert it
            setCurrentTime(responseData['currentTime'])  // extract the currentTime value. Can also use responseData.currentTime here.
        }

        getTime()

        const timer = setInterval(getTime, 1000) // Run getTime again in 1000ms
        return () => clearInterval(timer)  // Stop the timer when the component is unmounted.
    }, [])  // Read the useEffect docs to find why we're giving an empty list here.


    return <>
        <h1>The current time: {currentTime}</h1>
        <a href="/">Go back to index.</a>
    </>
}
