import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons"

export const Nav = ({ libraryStatus, setLibraryStatus }) => {
    return (
        <nav className="nav">
            <h1>Waves</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )
}
