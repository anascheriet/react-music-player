import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faGithub } from "@fortawesome/free-solid-svg-icons"

export const Nav = ({ libraryStatus, setLibraryStatus }) => {
    return (
        <nav className="nav">
            <h1>Waves <p style={{ fontSize: '0.5rem' }}>by anasCH</p></h1>
            
            <button ><a style={{ textDecoration: "none", color: "black" }} href="https://github.com/anascheriet/react-music-player" target="blank">Github</a>
                <i class="fab fa-github"></i>
            </button>
            <button className={libraryStatus ? "library-active" : ""}
                onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )
}
