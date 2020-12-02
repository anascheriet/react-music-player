import React, { useEffect } from 'react'
import { QueueSong } from './QueueSong';
import playlist from "../img/playlist.png"

export const Queue = ({ songs, queueStatus, setCurrentSong, audioRef, isPlaying, isRandom, queuedSongs, setQueuedSongs }) => {

    return (
        <div className={`queue ${queueStatus ? "active" : ""}`}>
            {/* <h2>Queue</h2> */}
            <div className="imgholder">
                <img className="queueimage" src={playlist} alt="song" />
            </div>
            <div>
                {queuedSongs.map(song => {
                    return <QueueSong key={song.id} song={song} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} />
                })}
            </div>
        </div>
    )
}
