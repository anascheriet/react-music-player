import React, { useEffect } from 'react'
import { QueueSong } from './QueueSong';
import playlist from "../img/playlist.png"
import RLDD from 'react-list-drag-and-drop/lib/RLDD';

export const Queue = ({ songs, queueStatus, setCurrentSong, audioRef, isPlaying, isRandom, queuedSongs, setQueuedSongs, currentSong }) => {

    useEffect(() => {
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
        setQueuedSongs(newSongs);
    }, [currentSong])

    const handleRLDDChange = (newItems) => {
        setQueuedSongs(newItems);
    }
    return (
        <div className={`queue ${queueStatus ? "active" : ""}`}>
            {/* <h2>Queue</h2> */}
            <div className="imgholder">
                <img className="queueimage" src={playlist} alt="song" />
            </div>
            <div>
              {/*   {queuedSongs.map(song => {
                    return <QueueSong key={song.id} song={song} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} />
                })} */}
                <RLDD
                    items={queuedSongs}
                    itemRenderer={(song) => {
                        return <QueueSong key={song.id} song={song} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} />
                    }}
                    onChange={handleRLDDChange}
                />
            </div>
        </div>
    )
}
