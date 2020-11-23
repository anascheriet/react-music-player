import { useRef, useState } from "react";
import { Library } from "./components/Library";
import { Player } from "./components/Player";
import { Song } from "./components/Song";
import './styles/app.scss';
import data from "./util";

function App() {
  //State 
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[3]);
  const [isPlaying, setIsPlaying] = useState(false);

  //Ref
  const audioRef = useRef(null);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying}/>
    </div>
  );
}

export default App;
