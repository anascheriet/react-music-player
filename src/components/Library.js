import React from 'react'
import { LibrarySong } from './LibrarySong';

export const Library = ({ songs, setCurrentSong, audioRef, isPlaying }) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return <LibrarySong key={song.id} song={song} setCurrentSong={setCurrentSong} audioRef={audioRef}  isPlaying={isPlaying}/>
                })}

            </div>
        </div>
    )
}
