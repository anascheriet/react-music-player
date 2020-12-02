import React from 'react'
export const QueueSong = ({ song, setCurrentSong, audioRef, isPlaying }) => {
    const selectSongHander = async () => {
        await setCurrentSong(song);
        if (isPlaying) {
            audioRef.current.play();
        }
    }
    return (
        <div onClick={selectSongHander} className={`queue-song ${song.active ? 'selected' : ''}`}>
            <img src={song.cover} alt="song" />
        </div>
    )
}
