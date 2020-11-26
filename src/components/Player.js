import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause, faRedo } from '@fortawesome/free-solid-svg-icons'
import { playAudio } from './util';
import data from "../data";
export const Player = ({ currentSong, setIsPlaying, isPlaying, audioRef, songs, setCurrentSong, setSongs }) => {

    //State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    const [isRepeating, setisRepeating] = useState(false);

    //useEffect
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true
                }
            }
            else {
                return {
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
    }, [currentSong])

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

        if (isRepeating) {
            let currentSongIndex = songs.findIndex(x => x.id === currentSong.id);
            setCurrentSong(songs[currentSongIndex]);
            playAudio(isPlaying, audioRef);
        }
        else {
            if (direction === 'previous') {
                if (currentSongIndex === 0) {
                    setCurrentSong(songs[lastSongIndex]);
                    playAudio(isPlaying, audioRef);
                }
                else {
                    setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
                    playAudio(isPlaying, audioRef);
                }
            }
            else if (direction === 'next') {
                setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
                playAudio(isPlaying, audioRef);
            }
        }
    }

    const songEndHandler = async () => {
        if (isRepeating === false) {
            let currentSongIndex = songs.findIndex(x => x.id === currentSong.id);
            await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
            if (isPlaying) audioRef.current.play();
        }
        else if (isRepeating === true) {
            let currentSongIndex = songs.findIndex(x => x.id === currentSong.id);
            await setCurrentSong(songs[(currentSongIndex)]);
            if (isPlaying) audioRef.current.play();
        }

    }

    const repeatSongHandler = () => {
        setisRepeating(!isRepeating);
        if (isRepeating === true) {
            setSongs(data());
        }
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>

                <input
                    type="range"
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler} />

                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon title="Previous" className="skip-back" size="2x" icon={faAngleLeft} onClick={() => skipSongHandle('previous')} />
                <div>
                    <FontAwesomeIcon  className="play" size="2x" title={isPlaying ? "Pause" : "Play"} icon={isPlaying ? faPause : faPlay} onClick={playSongHandler} /> &nbsp;&nbsp;
                <FontAwesomeIcon title="Repeat track" className="play" size="2x" icon={faRedo} color={isRepeating ? "green" : "black"} onClick={repeatSongHandler} />
                </div>
                <FontAwesomeIcon title="Next" className="skip-forward" size="2x" display={false} icon={faAngleRight} onClick={() => skipSongHandle('next')} />

            </div>

            <audio onTimeUpdate={timeUpdateHandler} ref={audioRef}
                onLoadedMetadata={timeUpdateHandler} src={currentSong.audio}
                onEnded={songEndHandler}></audio>
        </div>
    )
}
