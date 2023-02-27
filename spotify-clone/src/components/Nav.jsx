import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import * as FaIcons from "react-icons/fa";
import { menuItems } from "./MenuItems";
import Home from "./Home";
import Search from "./Search";
import Player from "./Player";


export default function Nav() {

  const [ selection, setSelection] = useState()

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

      </div>
      <div className="display-container">
        <main>
          {
            selection === "Home"? <Home/> : selection === "Search"? <Search/> : selection === undefined ? <Home/> : null
          }
        </main>
      </div>
      <div className="player-container">
          <Player/>
      </div>
    </div>
  )
}
