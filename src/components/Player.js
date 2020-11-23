import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
export const Player = ({ currentSong, setIsPlaying, isPlaying }) => {
    //Ref
    const audioRef = useRef(null);
    //event handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    //State
    const [songInfo, setSongInfo] = useState({
        currentTime: null,
        duration: null
    })


    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration: duration
        })
    }

    const getTime = (time) => {
        return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
    }



    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon className="play" size="2x" icon={faPlay} onClick={playSongHandler} />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />

            </div>
            <audio onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}
