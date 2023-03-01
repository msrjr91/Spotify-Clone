import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DataContext } from '../DataContext'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
})


export default function Home(){

  const {accessToken} = useContext(DataContext)
  spotifyApi.setAccessToken(accessToken)

  // useEffect(() => {
  //   spotifyApi.getPlaylist("0JQ5DAqbMKFDXXwE9BDJAr")
  //     .then(function(data) {
  //   console.log('Some information about this playlist', data.body);
  // }, function(err) {
  //   console.log('Something went wrong!', err);
  // });
  // },[])

  return(
    <section>
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1>Jump right in</h1><br />
        <div className="categories-container">

        </div>
        
      </div>
    </section>
  )
}
