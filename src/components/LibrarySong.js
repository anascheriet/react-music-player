import React from 'react'

export const LibrarySong = ({ song, setCurrentSong, audioRef, isPlaying }) => {


    const selectSongHandle = () => {
        setCurrentSong(song);
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                });
            }
        }
    };

    return (
        <div className="library-song" onClick={selectSongHandle}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    )
}
