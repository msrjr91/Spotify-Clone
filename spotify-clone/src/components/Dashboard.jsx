import Nav from "./Nav"

//Dashboard will house the navigation menu and display options depending on navigation selection
//example: if search option is selected, dashboard will render search page

export default function Dashboard() {
  return(
    <div className="dashboard">
      <div className="nav-container">
        <Nav />
      </div>
      <div className="display">

      </div>
      <div className="player">

      </div>
    </div>
  )
}
