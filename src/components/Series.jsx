import React from 'react'
import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import axios from 'axios'
import SeriesCard from './SeriesCard';
import '../components/series.scss'

const Series = () => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

    const [series, setseries] = useState([])
    const Apikey = import.meta.env.VITE_TMDB_KEY;
    const baseUrl = "https://api.themoviedb.org/3"
    const GetSeries = () => {
        axios.get(`${baseUrl}/tv/top_rated?api_key=${Apikey}`).then((response) => {
            const data = response.data.results
            setseries(data)
        })
    }

    useEffect(() => {
        GetSeries();
    }, [])

    
  return (
    <div className='upcoming-container'>

      <h2>series</h2>
      
      <div className="embla">
<div className="embla__viewport" ref={viewportRef}>
  <div className="embla__container">{series.map((card) => 
           <div className='embla_slide'>
            <SeriesCard
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

export default Series;



  

