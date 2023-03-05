import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Buffer } from 'buffer';
import Nav from './components/Nav';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import { DataContext } from "./DataContext";

//from Spotify developers dashboard
// const CLIENT_ID = "77089cefd6f24876925e0a39069e25ca"
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
// const CLIENT_SECRET = "b7a432f52dc9488996c87643f5959712"
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const auth_token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, 'utf-8').toString('base64')

function App() {

  const [ accessToken, setAccessToken ] = useState("")
  const [ songQueue, setSongQueue ] = useState([])
  const qs = require('qs')

  //set initial token for search permissions only. Full permissions granted upon login.
  const getToken = async () => {

    try{
      const token_url = "https://accounts.spotify.com/api/token"
      const data = qs.stringify({'grant_type':'client_credentials'})

      const response = await axios.post(token_url, data, {
        headers: {
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      setAccessToken(response.data.access_token)
      return response.data.access_token
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    async function checkToken() {
      if (accessToken === "") {
        console.log("No established token...getting token.")
        getToken()
      } else {
        console.log("INITIAL TOKEN: ", accessToken)
      }
    }
    checkToken()
  },[accessToken])

  return (
    <DataContext.Provider value={{accessToken, setAccessToken, songQueue, setSongQueue }}>
      <div className="App">
        <Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
        </Routes>
        </Nav> 
      </div>
    </DataContext.Provider>
  );
}

export default App;
