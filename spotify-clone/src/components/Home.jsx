import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DataContext, LoginContext } from '../DataContext'


export default function Home(){

  const {accessToken, setSongQueue} = useContext(DataContext)
  const { isLoggedIn } = useContext(LoginContext)
  const [ newReleases, setNewReleases ] = useState(null)
  const [ featuredPlaylists, setFeaturedPlaylists ] = useState(null)
  const [ audiobooks, setAudiobooks ] = useState(null)

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
      fetch("https://api.spotify.com/v1/browse/featured-playlists?country=US&locale=sv_US&timestamp=2014-10-23T09%3A00%3A00&limit=20&offset=5", searchParams)
        .then(result => result.json())
        .then(data => setFeaturedPlaylists(data.playlists.items))
    }
    getFeatured()
  }, [isLoggedIn, accessToken])

  //fetch audiobooks from Spotify
  useEffect(() => {
    async function getAudiobooks(){
      let searchParams = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      fetch("https://api.spotify.com/v1/audiobooks?ids=18yVqkdbdRvS24c0Ilj2ci%2C1HGw3J3NxZO1TP1BTtVhpZ%2C7iHfbu1YPACw6oZPAFJtqe&market=ES", searchParams)
      .then(result => result.json())
      .then(data => setAudiobooks(data.audiobooks))
    }
    getAudiobooks()
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

            {/* <h3 style={{display: "inline-block", marginBottom: "5px", marginTop: "15px"}}>Audiobooks</h3>
            <div className="audiobook" style={{marginBottom: "15px", marginTop: "15px"}}>
              {
                audiobooks?.map((book) => (
                  <div className="audiobook-container">
                    <img src={book.images[0].url} alt={book.name} className="album-image" height="200vh" style={{marginBottom: "5px", backgroundColor: "black"}}/>
                    <h4>{book.name}</h4>
                    <h5>{book.authors[0].name}</h5>
                  </div>
                ))
              }
            </div> */}

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

          </div> : null
        }
      </div>
    </section>
  )
}


// setSongQueue([]), setSongQueue([]), 
