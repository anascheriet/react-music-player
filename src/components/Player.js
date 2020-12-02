import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause, faRedo, faRandom } from '@fortawesome/free-solid-svg-icons'
import { playAudio } from './util';
import data from "../data";
import playlist from "../img/queueblack.svg";
export const Player = ({ currentSong, setIsPlaying, isPlaying, audioRef, songs, setCurrentSong, setSongs, queueStatus, setQueueStatus, isRandom, setIsRandom, queuedSongs, setQueuedSongs }) => {

    //State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    const [isRepeating, setisRepeating] = useState(false);

    //useEffect
    useEffect(() => {
        if (!isRandom) {
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
            setQueuedSongs(newSongs);
        } else if (isRandom) {

            const newSongs = queuedSongs.map((song) => {
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
            setQueuedSongs(shuffle(newSongs));
        }

    }, [isRandom])

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
        let currentSongIndex = queuedSongs.findIndex(x => x.id === currentSong.id);
        let lastSongIndex = queuedSongs.length - 1;

        if (isRepeating) {
            let currentSongIndex = queuedSongs.findIndex(x => x.id === currentSong.id);
            setCurrentSong(queuedSongs[currentSongIndex]);
            playAudio(isPlaying, audioRef);
        }
        else {
            if (direction === 'previous') {
                if (currentSongIndex === 0) {
                    setCurrentSong(queuedSongs[lastSongIndex]);
                    playAudio(isPlaying, audioRef);
                }
                else {
                    setCurrentSong(queuedSongs[(currentSongIndex - 1) % queuedSongs.length]);
                    playAudio(isPlaying, audioRef);
                }
            }
            else if (direction === 'next') {
                setCurrentSong(queuedSongs[(currentSongIndex + 1) % queuedSongs.length]);
                playAudio(isPlaying, audioRef);
            }
        }
    }

    const songEndHandler = async () => {
        console.log(queuedSongs);
        console.log(currentSong);

        if (isRepeating === false) {
            let currentSongIndex = queuedSongs.findIndex(x => x.id === currentSong.id);
            await setCurrentSong(queuedSongs[(currentSongIndex + 1) % queuedSongs.length]);
            if (isPlaying) audioRef.current.play();
        }
        else if (isRepeating === true) {
            let currentSongIndex = queuedSongs.findIndex(x => x.id === currentSong.id);
            await setCurrentSong(queuedSongs[(currentSongIndex)]);
            if (isPlaying) audioRef.current.play();
        }

    }

    const repeatSongHandler = () => {
        setisRepeating(!isRepeating);
        if (isRepeating === true) {
            setSongs(data());
        }
    }

    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
        return array;
    }

    const shuffleHandler = async () => {
        setIsRandom(!isRandom);
        //await setCurrentSong(queuedSongs[0]);
        if (isPlaying) {
            audioRef.current.play();
        }
    }

    const queueHandler = () => {
        setQueueStatus(!queueStatus);
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
                    <FontAwesomeIcon size="2x" icon={faRandom} color={isRandom ? "green" : "black"} onClick={shuffleHandler} /> &nbsp;&nbsp;
                    <FontAwesomeIcon className="play" size="2x" title={isPlaying ? "Pause" : "Play"} icon={isPlaying ? faPause : faPlay} onClick={playSongHandler} /> &nbsp;&nbsp;
                <FontAwesomeIcon title="Repeat track" className="play" size="2x" icon={faRedo} color={isRepeating ? "green" : "black"} onClick={repeatSongHandler} />&nbsp;&nbsp;
                    <img className="queueimage" title="Queue" src={playlist} onClick={queueHandler} />
                </div>
                <FontAwesomeIcon title="Next" className="skip-forward" size="2x"  icon={faAngleRight} onClick={() => skipSongHandle('next')} />

            </div>

            <audio onTimeUpdate={timeUpdateHandler} ref={audioRef}
                onLoadedMetadata={timeUpdateHandler} src={currentSong.audio}
                onEnded={songEndHandler}></audio>
        </div>
    )
}
