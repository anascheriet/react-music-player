import React from 'react'
import { LibrarySong } from './LibrarySong';

export const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return <LibrarySong key={song.id} song={song} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} songs={songs} id={song.id} />
                })}

            </div>
        </div>
    )
}
