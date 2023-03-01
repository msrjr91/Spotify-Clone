import SpotifyPlayer from 'react-spotify-web-playback';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../DataContext';

export default function Player(){

  const {accessToken, songQueue} = useContext(DataContext)
  // console.log("INHERITED SONG QUEUE:", songQueue)
  // console.log("PLAYER FUNC INHERITED TOKEN:", accessToken)

  const [ play, setPlay ] = useState(false)

  useEffect(() => {
    console.log('DETECTED SONG CHANGE', songQueue)
    nextSong = []
    setPlay(false)
    nextSong = songQueue
    setPlay(true)
  }, [songQueue])

  let nextSong = songQueue

  return(    
    <SpotifyPlayer
      token={accessToken}
      autoPlay={false}
      showSaveIcon
      initialVolume={0.3}
      magnifySliderOnHover={true}
      uris={nextSong}
      callback={state => {
        if(!state.isPlaying) setPlay(false)
      }}
      play={play}
      styles={{
        activeColor: '#000000',
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
