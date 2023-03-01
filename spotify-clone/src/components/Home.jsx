import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DataContext } from '../DataContext'
import axios from 'axios'

export default function Home(){

  const {accessToken} = useContext(DataContext)

  return(
    <section>
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1>Jump right in</h1><br />
        <div className="categories-container">

        </div>
        
      </div>
    </section>
  )
}
