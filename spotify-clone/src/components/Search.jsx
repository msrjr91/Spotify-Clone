import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DataContext } from '../DataContext'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
})

export default function Search(){

  
  const {accessToken} = useContext(DataContext)
  spotifyApi.setAccessToken(accessToken)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const { songQueue, setSongQueue } = useContext(DataContext)


  useEffect(() => {

    if(search.length === 0){
      setSearchResults([])
    }

    spotifyApi.searchTracks(search)
    .then(function(data) {

      const convertMS = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor(ms / 1000) % 60
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
    }, function(err) {
      console.error("error with query:",err)
    })
  },[search])
  console.log("search results", searchResults)
  console.log("current song queue:", songQueue)

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

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
              <div className="top-result-wrapper" style={{backgroundColor:"rgb(30, 30, 30)"}} onClick={()=>setSongQueue(songQueue.concat(searchResults[0].track))}> 
                <img src={searchResults[0].albumCover} alt={searchResults[0].name} height="100vh"/>
                <h2 className="result-title">{searchResults[0].name}</h2>
                <h6 className="result-artist">{searchResults[0].artist}</h6>
              </div>
            </div>
          }

        </div>
        <div className="top-four-songs">
          {
            (searchResults.length === 0) ? null : 
            <div className="top-four">
              <h3>Songs</h3>
              <ul style={{backgroundColor:"rgb(30, 30, 30)"}} className="top-four-list">
                {
                  searchResults.slice(1,5).map((tracks) => (
                    <li key={tracks.id} onClick={() => setSongQueue(songQueue.concat(tracks.track))}>
                      <img src={tracks.albumCover} alt={tracks.name} height="50vh"/>
                      <div className="track-metadata">
                        <p>{tracks.name}</p>
                        <p>{tracks.duration}</p>
                        <p>{tracks.artist}</p>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        </div>
        <div className="top-result-artists">
          {/* {
            (searchResults.length === 0) ? console.log("no artists yet...") : 
              uniqueArtists.artists.map((artist) => (
                <img src={artist.images[0].url} alt={artist.name} height="100vh"/>
              )
              )
          } */}
        </div>
      </div>
    </div>

  )
}
