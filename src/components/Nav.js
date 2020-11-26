import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faGithub } from "@fortawesome/free-solid-svg-icons"

export const Nav = ({ libraryStatus, setLibraryStatus }) => {
    return (
        <nav className="nav">
            <h1>Waves <p style={{ fontSize: '0.5rem' }}>by anasCH</p></h1>
            <button className={libraryStatus ? "library-active" : ""}
                onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
            <button ><a style={{ textDecoration: "none", color: "black" }} href="http://github.com/anascheriet" target="blank">Github</a>
                <i class="fab fa-github"></i>
            </button>
        </nav>
    )
}
