import SpotifyPlayer from 'react-spotify-web-playback';
import { useContext, useState, useEffect } from 'react';
import { DataContext, LoginContext } from '../DataContext';

export default function Player(){

  const {accessToken, songQueue} = useContext(DataContext)
  const [ play, setPlay ] = useState(false)

  useEffect(() => {
    console.log('DETECTED SONG CHANGE', songQueue)
    nextSong = []
    setPlay(false)
    nextSong = songQueue
    setPlay(true)
  }, [songQueue])

  useEffect(()=> {

  }, [])

  let nextSong = songQueue

  //Spotify SDK webplayback functionality
  return(    
    <SpotifyPlayer
      token={accessToken}
      autoPlay={false}
      // showSaveIcon
      initialVolume={0.3}
      magnifySliderOnHover={true}
      uris={nextSong}
      callback={state => {
        if(!state.isPlaying) setPlay(false)
      }}
      play={play}
      styles={{
        activeColor: '#1DB954',
        bgColor: '#333',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#000',
        sliderHandleColor: '#1DB954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  )
}
