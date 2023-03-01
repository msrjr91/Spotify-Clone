import SpotifyPlayer from 'react-spotify-web-playback';
import { useContext } from 'react';
import { DataContext } from '../DataContext';

export default function Player(){

  const {accessToken, songQueue} = useContext(DataContext)
  // console.log("player succsessfully read token:", accessToken)
  console.log("INHERITED SONG QUEUE:", songQueue)
  console.log("PLAYER FUNC INHERITED TOKEN:", accessToken)

  return(
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      uris={songQueue}
      tyles={{
        activeColor: 'black',
        bgColor: '#333',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  )

}
