import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../components/hero.scss'

function Hero() {
  const [headerMovie, setheaderMovie] = useState({})
  const Apikey = import.meta.env.VITE_TMDB_KEY;
  const baseUrl = "https://api.themoviedb.org/3"

  const getData = () => {
    axios.get(`${baseUrl}/movie/popular?api_key=${Apikey}`).then((response) => {
      const result = response.data.results;
      let randomMovie = result[Math.floor(Math.random() * result.length)]
      setheaderMovie(randomMovie)
      // console.log(randomMovie)
    })
  }

  let {id, title, overview, backdrop_path, genre_ids } = headerMovie;
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      
      <div className='banner-con'>
        <div className='overlay'></div>
      <img  src={`https://image.tmdb.org/t/p/original${backdrop_path }`} alt='image' />
      <div className='header-details'>
          <h1>{title}</h1>
          {headerMovie.genre_ids?.map((genre, index) => {
            return <span key={index}>{genre === 28 ? 'Action' :
              genre === 12 ? 'Adventure.' :
              genre === 28 ? 'Action.' :
                genre === 16 ? 'Animation.' :
                genre === 35 ? 'Comedy.' :
                genre === 14 ? 'Fantasy.' :
                genre === 10749 ? 'Romance.' :
                genre === 99 ? 'Documentary' :
                genre === 80 ? 'Crime.' :
                genre === 18 ? 'Drama.' :
                genre === 36 ? 'History.' :
                genre === 10402 ? 'Music.' :
                genre === 27 ? 'Horror.' :
                genre === 878 ? 'Science Fiction.' : ""
                          
              }</span>
          })}
        
          <p>{overview}</p>
          
        <button className='btn-1'>watch now</button>
       <Link to={`movieDetails/:${id}`}><button className='btn-2'>more info</button></Link> 
        </div>
      </div>

      </div>
  )
}

export default Hero


