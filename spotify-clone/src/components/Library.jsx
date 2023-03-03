import { useContext, useState, useEffect } from "react"
import { LoginContext, DataContext } from "../DataContext"
import * as FaIcons from "react-icons/fa"


export default function LikedSongs(){

  const {isLoggedIn, likedSongs} = useContext(LoginContext)
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

  return(
    <div className="liked-container">
      <h1 style={{display: "inline-block"}}>Liked Songs</h1>
      <div className="liked-songs">
        {
          isLoggedIn && likedSongs.length > 0 ? 
          <div className="liked-songs">
            <button className="play-liked-songs" style={{backgroundColor: "#1DB954"}} onClick={() => setSongQueue(playLikedSongs)}><FaIcons.FaPlayCircle/></button>
            {
              likedSongs.length > 0 ?
              likedSongs.map((song) => (
                <div className="liked-song-container" key={song.id} style={{marginTop: "30px", display: "flex"}}>
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
