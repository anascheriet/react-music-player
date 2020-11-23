import React from 'react'

export const LibrarySong = ({ song, setCurrentSong, songs }) => {

    return (
        <div className="library-song" onClick={() => setCurrentSong(song)}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    )
}
