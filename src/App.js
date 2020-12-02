import { useRef, useState } from "react";
import { Library } from "./components/Library";
import { Nav } from "./components/Nav";
import { Player } from "./components/Player";
import { Song } from "./components/Song";
import './styles/app.scss';
import data from "./data";
import { Queue } from "./components/Queue";

function App() {
  //State 
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [queueStatus, setQueueStatus] = useState(false);
  const [queuedSongs, setQueuedSongs] = useState([]);
  const [isRandom, setIsRandom] = useState(false);

  //Ref
  const audioRef = useRef(null);
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Queue songs={songs} queueStatus={queueStatus} setQueueStatus={setQueueStatus} setCurrentSong={setCurrentSong} setSongs={setSongs} audioRef={audioRef} isPlaying={isPlaying} queuedSongs={queuedSongs} setQueuedSongs={setQueuedSongs} isRandom={isRandom} setIsRandom={setIsRandom} currentSong={currentSong} />
      <Song currentSong={currentSong} />
      <Player audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} queueStatus={queueStatus} setQueueStatus={setQueueStatus} isRandom={isRandom} setIsRandom={setIsRandom} queuedSongs={queuedSongs} setQueuedSongs={setQueuedSongs} />
      <Library songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus} />
    </div>
  );
}

export default App;
