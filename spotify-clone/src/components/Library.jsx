import { useContext, useState, useEffect } from "react"
import { LoginContext, DataContext } from "../DataContext"
import * as FaIcons from "react-icons/fa"
import { TiArrowShuffle } from "react-icons/ti"


export default function LikedSongs(){

  const {isLoggedIn, likedSongs, setLikedSongs} = useContext(LoginContext)
  const { songQueue, setSongQueue } = useContext(DataContext)

  const [ playLikedSongs, setPlayLikedSongs ] = useState([])

  useEffect(() => {
    console.log("DETECTED NEW LIKED SONG", likedSongs)
    let likedSongsIDs = []
    likedSongs.forEach((song) => {
      likedSongsIDs.push(song.track)
    })
    setPlayLikedSongs(likedSongsIDs)
  },[likedSongs])

  console.log("CURRENT SONG QUEUE FOR LIKED SONGS", playLikedSongs)

  const handleShuffle = () => {
    setLikedSongs(likedSongs.sort( () => Math.random() - 0.5))
    let likedSongsIDs = []
    likedSongs.forEach((song) => {
      likedSongsIDs.push(song.track)
    })
    // setPlayLikedSongs(likedSongsIDs)    
    setSongQueue(likedSongsIDs)
  }

  return(
    <div className="liked-container">
      <h1 style={{display: "inline-block"}}>Liked Songs</h1>
      <div className="liked-songs">
        {
          isLoggedIn && likedSongs.length > 0 ? 
          <div className="liked-songs">
            <div className="buttons-container">
              <button className="shuffle-liked-songs" style={{backgroundColor: "#1DB954"}} onClick={handleShuffle}><TiArrowShuffle size={30}/></button><button className="play-liked-songs" style={{backgroundColor: "#1DB954"}} onClick={() => setSongQueue(playLikedSongs)}><FaIcons.FaPlayCircle size={30}/></button>
            </div>
            <br />
            <br />
            <br />
            <br />
            {
              likedSongs.length > 0 ?
              likedSongs.map((song) => (
                <div className="liked-song-container" key={song.id} style={{marginTop: "20px", display: "flex"}} onClick={() => setSongQueue(song.track)}>
                  <img src={song.albumCover} alt={song.name} className="liked-song-image" height="100vh"/>
                  <div className="liked-song-info" style={{fontSize: "1.5vw", marginLeft: "10px", marginTop: "auto", marginBottom: "auto"}}>
                    <h2>{song.name}</h2>
                    <h4>{song.artist}</h4>
                  </div>  
                </div> 
              )) : null
            }
          </div> : null
        }
      </div>
    </div>
  )
}
