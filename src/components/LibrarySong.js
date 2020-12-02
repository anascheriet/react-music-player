import React from 'react';
import { playAudio } from './util';

export const LibrarySong = ({ song, setCurrentSong, audioRef, isPlaying, setSongs, songs, id }) => {


    const selectSongHandle = () => {
        setCurrentSong(song);
        playAudio(isPlaying, audioRef);

        /* const newSongs = songs.map((song) => {
            if (song.id === id) {
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
        })
        setSongs(newSongs); */
    };

    return (
        <div className={`library-song ${song.active ? 'selected' : ''}`} onClick={selectSongHandle}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    )
}
