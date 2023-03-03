import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DataContext, LoginContext } from "../DataContext";
import { menuItems } from "./MenuItems";
import Home from "./Home";
import Search from "./Search";
import Player from "./Player";
import Library from "./Library";


export default function Nav() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ selection, setSelection] = useState()
  const [ likedSongs, setLikedSongs ] = useState([])
  const { accessToken, setAccessToken } = useContext(DataContext)

  //required parameters for Spotify auth
  let client_id = process.env.REACT_APP_CLIENT_ID;
  // let redirect_uri = 'http://localhost:3000/callback';
  let redirect_uri = "https://jade-nasturtium-e030aa.netlify.app/"
  let state = "random-string-for-state";
  let scope = 'user-read-private user-read-email streaming user-library-read user-library-modify user-read-playback-state user-modify-playback-state';
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  //extract token from URL after login
  let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  let token = urlParams.get('access_token');
  if(token){
    setAccessToken(token)
  }

  useEffect(()=>{
    if(accessToken.length > 200){
      setIsLoggedIn(true)
    }  
  }, [accessToken])

  return(
    <div className="container">

      <div className="nav-container">

        <div className="top-section">
          <img src="Images/Spotify_Logo_RGB_White.png" alt="spotify-logo" className="logo"/><br/>
        </div>

        <div className="nav-items">
            {
              menuItems.map((item, index) => {
                return(
                  <Link to={item.path} key={index} className="link" onClick={() => setSelection(item.name)}>
                    <div className="icon">{item.logo}</div><div className="link-text">{item.name}<br/></div>
                  </Link>
                )
              })
            }
        </div>

        <div className="login">
          {
            !isLoggedIn ? <button className="login-button"><a href={url}>Spotify Login</a></button> : <h4 style={{position: "absolute", bottom: "100px"}}>You rockstar 😎</h4>
          }
        </div>
      </div>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, likedSongs, setLikedSongs }}>
      <div className="display-container">
        
          <main>
            {
              selection === "Home" ? <Home /> : selection === "Search" ? <Search/> : selection === "Library" ? <Library /> : selection === undefined ? <Home/> : null
            }
          </main>
        
      </div>

      <div className="player-container">
      
        {
          isLoggedIn ? <Player/> : <p style={{marginBottom: "30px"}}>Login with a Spotify premium account for playback permissions</p>
        }
      </div>
      </LoginContext.Provider>
    </div>
  )
}
