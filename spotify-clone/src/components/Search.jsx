import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DataContext } from '../DataContext'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
})

export default function Search(){

  const {accessToken} = useContext(DataContext)
  spotifyApi.setAccessToken(accessToken)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  // console.log("successfully read token:" + accessToken)
  // console.log("RETURNED RESULTS:", searchResults)


  useEffect(() => {

    if(search.length === 0){
      setSearchResults([])
    }

    spotifyApi.searchTracks(search)
    .then(function(data) {

      const convertMS = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor(ms / 1000)
        return `${minutes}:${seconds}`
      }

      console.log(`Searching for ${search}`, data.body.tracks.items)
      setSearchResults(data.body.tracks.items.map((track)=>(
        {
          id: track.id,
          name: track.name,
          track: track.uri,
          artist: track.artists[0].name,
          artistURI: track.artists[0].uri,
          albumCover: track.album.images[0].url,
          albumURI: track.album.uri,
          duration: convertMS(track.duration_ms)
        }
      )))
    }, function(err) {
      console.error(err)
    })
  },[search])

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
              <img src={searchResults[0].albumCover} alt={searchResults[0].name} height="200vh"/>
              <h2>{searchResults[0].name}</h2>
              <h5>{searchResults[0].artist}</h5>
          </div>
          }

        </div>
        <div className="top-four-songs">
          {
            (searchResults.length === 0) ? null : 
            <div className="top-four">
              <h3>Songs</h3>
              <ul>
                {
                  searchResults.slice(0,4).map((tracks) => (
                    <li key={tracks.id}>
                      <img src={tracks.albumCover} alt={tracks.name} height="50vh"/>
                      <h2>{tracks.name}</h2>
                      <h5>{tracks.artist}</h5>
                      <p>{searchResults.duration_ms}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
          {/* {
            search.length > 0 ? 
            <div className="top-five">
              <h3>Songs</h3>
              
            </div> : null
          } */}
        </div>
        <div className="top-result-artists"></div>
      </div>
    </div>

  )
}
