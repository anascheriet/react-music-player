import { useRef, useState } from "react";
import { Library } from "./components/Library";
import { Nav } from "./components/Nav";
import { Player } from "./components/Player";
import { Song } from "./components/Song";
import './styles/app.scss';
import data from "./data";

function App() {
  //State 
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[3]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  //Ref
  const audioRef = useRef(null);
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} />
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus}/>
    </div>
  );
}

export default App;
