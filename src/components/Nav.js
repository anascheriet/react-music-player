import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import githublogo from "../img/github.png"

export const Nav = ({ libraryStatus, setLibraryStatus }) => {
    return (
        <nav className="nav">
            <h1>Waves <p style={{ fontSize: '0.5rem' }}>by anasCH</p></h1>

           {/*  <button ><a style={{ textDecoration: "none", color: "black" }} href="https://github.com/anascheriet/react-music-player" target="blank">Github</a>
            </button> */}
            
            <a style={{ textDecoration: "none", color: "black" }} href="https://github.com/anascheriet/react-music-player" target="blank"><img src={githublogo} className="githublogo" /></a>
             
            

            <button className={libraryStatus ? "library-active" : ""}
                onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>

           
           
            


        </nav>
    )
}
