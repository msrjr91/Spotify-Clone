import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DataContext, LoginContext } from '../DataContext'


export default function Home(){

  const {accessToken, setSongQueue} = useContext(DataContext)
  const { isLoggedIn } = useContext(LoginContext)
  const [ newReleases, setNewReleases ] = useState(null)
  const [ featuredPlaylists, setFeaturedPlaylists ] = useState(null)
  const [ throwbacksPlaylist, setThrowbacksPlaylist ] = useState(null)

  //fetch new album releases from Spotify
  useEffect(() => {
    async function getNew(){
      let searchParams = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      fetch("https://api.spotify.com/v1/browse/new-releases", searchParams)
        .then(result => result.json())
        .then(data => setNewReleases(data.albums.items))
    }
    getNew()
  },[isLoggedIn, accessToken])

  //fetch featured playlists from Spotify
  useEffect(() => {
    async function getFeatured(){
      let searchParams = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      fetch("https://api.spotify.com/v1/browse/featured-playlists?country=US&locale=sv_US&timestamp=2023-03-03T09%3A00%3A00&limit=20&offset=0", searchParams)
        .then(result => result.json())
        .then(data => setFeaturedPlaylists(data.playlists.items))
    }
    getFeatured()
  }, [isLoggedIn, accessToken])

  //fetch throwbacks from Spotify
  useEffect(() => {
    async function getThrowbacks(){
      let searchParams = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      fetch("https://api.spotify.com/v1/browse/featured-playlists?country=US&locale=sv_US&timestamp=2015-09-24T09%3A00%3A00&limit=20&offset=1", searchParams)
      .then(result => result.json())
      .then(data => setThrowbacksPlaylist(data.playlists.items))
    }
    getThrowbacks()
  },[isLoggedIn, accessToken])

  return(
    <section>
      <div>
        <br />
        <br />
        <br />
        <br />
        {
          isLoggedIn && newReleases ? 
          <div className="categories-container">
            <h1>Jump right in</h1><br />
            <h3 style={{display: "inline-block", marginBottom: "5px"}}>New Releases</h3>
            <div className="new-release-albums">
              { 
                newReleases?.map((album) => (
                  <div className="album-container" key={album.id} onClick={() => (setSongQueue(album.uri))}>
                    <img className="album-container-image" src={album.images[0].url} alt={album.name} height="170vh" style={{marginBottom: "5px"}}/>
                    <h4 style={{marginBottom: "5px"}}>{album.name}</h4>
                    <h5>{album.artists[0].name}</h5>
                  </div>
                )) 
              }
            </div>

            <h3 style={{display: "inline-block", marginBottom: "5px", marginTop: "30px"}}>Featured Playlists</h3>
            <div className="featured-playlist-covers">
              {
                featuredPlaylists?.map((playlist) => (
                  <div className="featured-playlist-container" key={playlist.id} onClick={() => (setSongQueue(playlist.uri))}>
                    <img src={playlist.images[0].url} alt={playlist.name} className="featured-playlist-image" height="170vh" style={{marginBottom: "5px"}}/>
                  </div>
                ))
              }
            </div>


            <h3 style={{display: "inline-block", marginBottom: "5px", marginTop: "30px"}}>Throwback Thursdays</h3>
            <div className="throwbacks-playlist-covers">
              {
                throwbacksPlaylist?.map((playlist) => (
                  <div className="throwbacks-playlist-container" key={playlist.id} onClick={() => (setSongQueue(playlist.uri))}>
                    <img src={playlist.images[0].url} alt={playlist.name} className="throwbacks-playlist-image" height="170vh" style={{marginBottom: "5px"}}/>
                  </div>
                ))
              }
            </div>

          </div> : null
        }
      </div>
    </section>
  )
}


// setSongQueue([]), setSongQueue([]), 
