import { Link } from "react-router-dom";

const linkStyle = {
  color: "white",
  textDecoration: "none",
}

export default function Nav(){
  return(
    <div className="nav-bar">
      <img src="Images/Spotify_Logo_RGB_White.png" height="60vh" alt="spotify-logo"/><br/>  
      <Link to="/" style={linkStyle}><img src="Images/home.png"/>Home</Link><br/>
      <Link to="/search" style={linkStyle}><img src="Images/search.png"/>Search</Link>
    </div>
  )
}
