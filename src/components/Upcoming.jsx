import React from 'react'
import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import axios from 'axios'
import UpcomingMovieCard from './UpcomingMovieCard'
import '../components/upcoming.scss'

const Upcoming = () => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

    const [upcoming, setupcoming] = useState([])
    const Apikey = import.meta.env.VITE_TMDB_KEY;
    const baseUrl = "https://api.themoviedb.org/3"
    const GetUpcoming = () => {
        axios.get(`${baseUrl}/movie/popular?api_key=${Apikey}`).then((response) => {
            const data = response.data.results
            setupcoming(data)
        })
    }

    useEffect(() => {
        GetUpcoming();
    }, [])

    
  return (
    <div className='upcoming-container'>

      <h2>Latest</h2>
      
      <div className="embla">
<div className="embla__viewport" ref={viewportRef}>
  <div className="embla__container">{upcoming.map((card) => 
           <div className='embla_slide'>
            <UpcomingMovieCard
    card={card} key={card.id}/>
            </div>
          
        )}</div>
</div>
<button className="embla__button_prev" onClick={scrollPrev}>
&lt;
</button>
<button className="embla__button_next" onClick={scrollNext}>
&gt;
</button>
</div>

    </div>
  )
}

export default Upcoming;



  
