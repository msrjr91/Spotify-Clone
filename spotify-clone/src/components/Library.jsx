import { useContext } from "react"
import { LoginContext } from "../DataContext"


export default function LikedSongs(){

  const {isLoggedIn} = useContext(LoginContext)

  return(
    <div className="liked-songs">
      {
        isLoggedIn ? <h1>Liked Songs</h1> : null
      }
    </div>
  )
}
