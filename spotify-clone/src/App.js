import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { DataContext } from './DataContext'
import { Buffer } from 'buffer';
import Dashboard from './components/Dashboard';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const auth_token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, 'utf-8').toString('base64')

function App() {

  const [ accessToken, setAccessToken ] = useState("")
  const qs = require('qs')

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

  // useEffect(() => {
  //   getToken()
  // },[])

  useEffect(()=>{
    async function checkToken() {
      if (accessToken === "") {
        console.log("No established token...getting token.")
        getToken()
      } else {
        console.log("Access Token is valid: ", accessToken)
      }
    }
    checkToken()
  },[accessToken])

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
