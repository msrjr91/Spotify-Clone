import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DataContext, LoginContext } from '../DataContext'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: "77089cefd6f24876925e0a39069e25ca",
  clientSecret: "b7a432f52dc9488996c87643f5959712"
})

export default function Search(){
  
  const {accessToken} = useContext(DataContext)
  spotifyApi.setAccessToken(accessToken)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const { setSongQueue } = useContext(DataContext)
  const { likedSongs, setLikedSongs } = useContext(LoginContext)
  const [ artists, setArtists ] = useState([])
  const [ artistDisplay, setArtistDisplay ] = useState(null)

  useEffect(() => {

    if(search.length === 0){
      setSearchResults([])
    }else if(search.length > 0){
      spotifyApi.searchTracks(search)
    .then(function(data) {

      const convertMS = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor(ms / 1000) % 60
        if(seconds < 10){
          return `${minutes}:0${seconds}`
        }
        return `${minutes}:${seconds}`
      }

      console.log(`Searching for ${search}`, data.body.tracks.items)
      setSearchResults(data.body.tracks.items.map((track)=>(
        {
          id: track.id,
          name: track.name,
          track: track.uri,
          artist: track.artists[0].name,
          artistID: track.artists[0].id,
          artistURI: track.artists[0].uri,
          albumCover: track.album.images[0].url,
          albumURI: track.album.uri,
          duration: convertMS(track.duration_ms)
        }
      )))
      setArtists(data.body.tracks.items.map((track)=>(
        {
          artist: track.artists[0].name,
          artistID: track.artists[0].id,
          artistURI: track.artists[0].uri
        }
      )))

    }, function(err) {
      console.error("error with query:",err)
    })
    }
  },[search])

    // console.log('ARTISTS:', artists)

  useEffect(() => {
    setArtistDisplay([])
    async function getArtists(){

      let searchParams = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      let key = "artistID"
      let topFiveUnique = [...new Map(artists.map(item => [item[key], item])).values()]
      // console.log("UNIQUE ARTISTS:", topFiveUnique)
      topFiveUnique.slice(0,5).forEach((artist) => (
        // console.log("for each:", artist)
        fetch("https://api.spotify.com/v1/artists/" + artist.artistID, searchParams))
          .then(response => response.json())
          .then(data => setArtistDisplay(artistDisplay=>[...artistDisplay,data]))
      )
    }
    getArtists()
  },[artists, searchResults])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  console.log("CURRENT LIKED SONGS:", likedSongs)

  return(
    <div className="search-container">
      <div className="search-bar">
        <input type="text" placeholder="What do you want to listen to?" onChange={handleChange} value={search}/>
        <i className="fa fa-search fa-lg fa-fw" aria-hidden="true"></i>
      </div>

      <div className="search-results-container">
        <div className="top-result-container">
          {
            (searchResults.length === 0) ?           
            
            <h2>Browse all</h2> : 
            <div className="top-result">
              <h3>Top Result</h3>
              <div className="top-result-wrapper" style={{backgroundColor:"#11210f", borderRadius:"8px"}} onClick={() => (setSongQueue(searchResults[0].track))}> 
                <img src={searchResults[0].albumCover} alt={searchResults[0].name} height="100vh"/>
                <h2 className="result-title">{searchResults[0].name}</h2>
                <h6 className="result-artist">{searchResults[0].artist}</h6>
                <img src={(likedSongs.some(song => song.id === searchResults[0].id)) ? "Images/checkmark.png" : "Images/add-song.png" } alt="add-song-logo" className='add-song' height="30vh" style={{position: "relative", marginLeft: "90%"}} onClick={(likedSongs.some(song => song.id === searchResults[0].id)) ? console.log("CAN ADD") : () => setLikedSongs(likedSongs => [...likedSongs, searchResults[0]])}/>
              </div>
            </div>
          }
        </div>
        <div className="top-four-songs">
          {
            (searchResults.length === 0) ? null : 
            <div className="top-four">
              <h3>Songs</h3>
              <ul style={{backgroundColor:"#11210f", borderRadius:"8px"}} className="top-four-list">
                {
                  searchResults.slice(1,6).map((tracks) => (
                    <li key={tracks.id}>
                      <img src={tracks.albumCover} alt={tracks.name} height="50vh"/>
                      
                      <div className="track-metadata" style={{fontSize: "1vw"}} onClick={() => (setSongQueue(tracks.track))}>
                        <p>{tracks.name} - {tracks.artist}</p>
                        <p style={{marginLeft: "auto"}}>{tracks.duration}</p>
                        
                      </div>
                      <img src={(likedSongs.some(song => song.id === tracks.id)) ? "Images/checkmark.png" : "Images/add-song.png"} alt="add-song-logo" className='add-song' height="30vh" style={{marginTop: "auto", marginBottom: "auto", marginLeft: "10px"}} onClick={(likedSongs.some(song => song.id === tracks.id)) ? console.log("CAN ADD"): () => setLikedSongs(likedSongs => [...likedSongs, tracks])}/>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        </div>
        <div className="top-result-artists">
          {
            search.length > 0 ? 
            artistDisplay.map((artist) => (
              <div className="artist-image-container" style={{textAlign: "center"}}>
              <h5 style={{marginBottom:"15px"}}>{artist.name}</h5>
              <img src={artist.images[0].url} alt={artist.name} className={artist.id} style={{borderRadius: "50%"}} height="120vh"/>
            </div>
            )) : null
          }
        </div>
      </div>
    </div>

  )
}
