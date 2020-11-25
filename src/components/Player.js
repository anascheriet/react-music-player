import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'
export const Player = ({ currentSong, setIsPlaying, isPlaying, audioRef, songs, setCurrentSong, setSongs }) => {

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
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }

    //State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
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

    const skipSongHandle = (direction) => {
        let currentSongIndex = songs.findIndex(x => x.id === currentSong.id);
        let lastSongIndex = songs.length - 1;
        if (direction === 'previous') {
            if (currentSongIndex === 0) {
                setCurrentSong(songs[lastSongIndex]);
            }
            else {
                setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
            }
            console.log(songs.length - 1);
        }
        else if (direction === 'next') {
            setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
        }
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>

                <input
                    type="range"
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={dragHandler} />

                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} onClick={() => skipSongHandle('previous')} />
                <FontAwesomeIcon className="play" size="2x" icon={isPlaying ? faPause : faPlay} onClick={playSongHandler} />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} onClick={() => skipSongHandle('next')} />

            </div>

            <audio onTimeUpdate={timeUpdateHandler} ref={audioRef}
                onLoadedMetadata={timeUpdateHandler} src={currentSong.audio}></audio>
        </div>
    )
}
