import  { Container, Form } from 'react-bootstrap' 
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
  const [search, setSearch] = useState('')
  console.log("successfully read token:" + accessToken)

  return(
    <div className="search-container">
      <div className="search-bar">
        <input type="text" placeholder="What do you want to listen to?" onChange={e => setSearch(e.target.value)} value={search}/>
      </div>
      <div className="search-results">Songs</div>
    </div>

  )
}
