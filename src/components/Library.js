import React, { useEffect } from 'react'
import { LibrarySong } from './LibrarySong';

export const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, currentSong }) => {

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
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div >
                {songs.map(song => {
                    return <LibrarySong key={song.id} song={song} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} songs={songs} id={song.id} />
                })}

            </div>
        </div>
    )
}
