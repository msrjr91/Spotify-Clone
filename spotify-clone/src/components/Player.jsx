import SpotifyPlayer from 'react-spotify-web-playback';
import { useContext } from 'react';
import { DataContext } from '../DataContext';

export default function Player(){

  const {accessToken, songQueue} = useContext(DataContext)

  console.log("player succsessfully read token:", accessToken)
  console.log("curren song in queue:", songQueue)
  return(
    <SpotifyPlayer
      token="BQBqk8YHHKdK1IgLH8_nVMWOQs_R5y1bLqzXEAK0bkAlhI_HfRSZIekMUEh9xlhAZToxqoRQ_GFWHN1TWwO3KxV7kS8Lt7e9pzp-DpaGZpbZi_tLSfzRawMAFhMukClKDfvtSY6KHYc3kc0YXm6f0tbq5yRJwGD6_ZnDK7sk8B3vj8MaQUw3Umrnn03vWxWtQDM3ChULQ6FlsQk6YLLsLkrAYF9pD43RK4JK5ljS6X6I5JWzzwuA3bI"
      showSaveIcon
      // uris={songQueue ? songQueue : []}
      uris={[songQueue]}
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
