import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DataContext, LoginContext } from '../DataContext'


export default function Home(props){

  const {accessToken, songQueue, setSongQueue} = useContext(DataContext)
  const { isLoggedIn } = useContext(LoginContext)
  const [ newReleases, setNewReleases ] = useState(null)

  console.log("LOGIN STATUS:", isLoggedIn)

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

  if(isLoggedIn){
    console.log("NEW ALBUMS OUT:", newReleases)
  }


  return(
    <section>
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1>Jump right in</h1><br />
        {
          isLoggedIn && newReleases ? 
          <div className="categories-container">
          
          <h3 style={{display: "inline-block", marginBottom: "5px"}}>New Releases</h3>
          <div className="new-release-albums">
            { 
              newReleases?.map((album) => (
                <div className="album-container" key={album.id} onClick={() => (setSongQueue([]), setSongQueue(album.uri))}>
                  <img className="album-container-image" src={album.images[0].url} alt={album.name} height="120vh" style={{marginBottom: "5px"}}/>
                  <h4 style={{marginBottom: "5px"}}>{album.name}</h4>
                  <h5>{album.artists[0].name}</h5>
                </div>
              )) 
            }
          </div>
        </div> : <h2></h2>
        }
      </div>
    </section>
  )
}
