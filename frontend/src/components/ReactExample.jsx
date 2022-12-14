import React from 'react'

export default function MyReactComponent() {
    console.log("Hello from a React component. If you see this message in the npm console it's being rendered server-side. If you see it in the browser console it's being rendered client-side.")
    // The <> and </> is known as a "fragment", it's to prevent needing to wrap our component in a <div> -->
    return (
        <>
            <h1>This is a React component</h1>
            <p className="border-2 border-l-rose-500 border-b-blue-500">And a paragraph of text</p>
            <button
                className="border-rose-500"
                onClick={() => console.log(`%cClickity clack`, 'background: lightgreen; color: #444; padding: 3px; border-radius: 5px;')}
            >
                Click Me and look at the console for a message!
            </button>
        </>
    )
}