import React from 'react'
import { useState, useEffect } from 'react'
import Hero from './Hero'
import '../components/home.scss'
import Upcoming from './Upcoming'
import TopRated from './TopRated'
import Popular from './Popular'
import Series from './Series'

function Home() {
  const [loader, setloader] = useState(null)
useEffect(() => {
  setloader(true)

  setTimeout(() => {
    setloader(false)
  }, 5000);
}, [])

  return (
    <div className='home-container'>
     {loader ?  <span className="loader"></span> : null}
      <Hero />
      <Upcoming />
      <TopRated />
      <Popular />
      <Series />
    </div>
  )
}

export default Home
