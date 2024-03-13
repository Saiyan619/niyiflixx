import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import '../pages/moviedetails.scss'
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react';
import YouTube from 'react-youtube';

const MovieDetail = () => {
    const [viewportRef, embla] = useEmblaCarousel({ loop: true });

    const scrollPrev = () => embla && embla.scrollPrev();
    const scrollNext = () => embla && embla.scrollNext();


  const [video, setvideo] = useState({});
  const [closeTrailer, setcloseTrailer] = useState(false)
    const [cast, setcast] = useState([])
    const [details, setDetails] = useState([])
 
    const Apikey = import.meta.env.VITE_TMDB_KEY;
    const baseUrl = "https://api.themoviedb.org/3"
  let param = useParams();
    let numberWithColon = param.id;
let stringWithoutColon = numberWithColon.toString().replace(/:/, '');
let numberWithoutColon = parseInt(stringWithoutColon, 10);
  console.log(numberWithoutColon);

  function toggleCloseTrailer() {
    setcloseTrailer(!closeTrailer);
  }
    const getDetails = async() => { 
        const response = await fetch(`${baseUrl}/movie/${numberWithoutColon}?api_key=${Apikey}`);
        const data = await response.json()
        setDetails(data)
  }


    const getCast = () => {
        axios.get(`${baseUrl}/movie/${numberWithoutColon}/credits?api_key=${Apikey}`).then((response) => {
            let result = response.data.cast;
            let newResults = result.splice(0, 13)
            setcast(newResults);
        })
  }  
  
  const trailer = async () => {
    axios.get(`${baseUrl}/movie/${numberWithoutColon}/videos?api_key=${Apikey}`).then((response) => {
      let result = response.data.results;
      console.log(result)
      // Define possible trailer name variations
    const trailerNameVariations = [
      'Official Trailer',
      'Trailer',
      'Official trailer',
      'Teaser',
      'Official UK Trailer',
      'Official Restricted Trailer',
      'official Restricted Trailer',
      
      
      // Add more variations as needed
    ];

    // Find the first trailer that matches any of the variations
      let officialTrailer = result.find((videoName) => trailerNameVariations.includes(videoName.name));
      if (officialTrailer) {
        console.log(officialTrailer);
        setvideo(officialTrailer);
              } else {
                let officialTrailer = null
        console.log(officialTrailer);
        setvideo(officialTrailer)
        
              }
      setvideo(officialTrailer)
      // let newResults = result.splice(0, 13)
      // setcast(newResults);
  })
  }

  useEffect(() => {
    getDetails();
    getCast();
    trailer();
  }, []);

    let {
      original_title,
      original_name,
        backdrop_path,
        budget,
        genres,
        overview,
        release_date,
        status,
        vote_average
    } = details;  
   
  // console.log(original_title || original_name )
    return (
      <div className="main-details-con">
        <div className="details-con-1">
          <div className="overlay"></div>
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt="image"
          />
          <div className='youtube-container'>
            {closeTrailer ? <YouTube
              videoId={video ? video.key : null}  /> : null}
           {closeTrailer ? <button onClick={toggleCloseTrailer}>Close</button> : null}
          </div>
          <div className="details">
            <h1>{original_title || name}</h1>
            {genres?.map((genre, index) => {
              return (
                <span key={index}>
                  {genre.id === 28
                    ? "Action."
                    : genre.id === 12
                    ? "Adventure."
                    : genre.id === 16
                    ? "Animation."
                    : genre.id === 35
                    ? "Comedy."
                    : genre.id === 14
                    ? "Fantasy."
                    : genre.id === 10749
                    ? "Romance."
                    : genre.id === 99
                    ? "Documentary"
                    : genre.id === 80
                    ? "Crime."
                    : genre.id === 18
                    ? "Drama."
                    : genre.id === 36
                    ? "History."
                    : genre.id === 10402
                    ? "Music."
                    : genre.id === 27
                    ? "Horror."
                    : genre.id === 878
                    ? "Science Fiction."
                    : ""}
                </span>
              );
            })}

            <p>{overview}</p>

            <button onClick={toggleCloseTrailer} className="btn-1">watch now</button>
            <button className="btn-2">more info</button>
          </div>
        </div>

        <div className="details-con-2">
          <div className="other-details-con">
            <span>Release Date: </span>
            <span>{release_date}</span>
          </div>

          <div className="other-details-con">
            <span>Budget: </span>
            <span>${budget}</span>
          </div>

          <div className="other-details-con">
            <span>Status: </span>
            <span>{status}</span>
          </div>

          <div className="other-details-con">
            <span>Ratings: </span>
            <span
              style={{
                color:
                  vote_average >= 8
                    ? "green"
                    : vote_average >= 5 && vote_average <= 7.9
                    ? "yellow"
                    : "red",
              }}
            >
              {vote_average}
            </span>
          </div>
            </div>
            
            <div className='cast-details'>
                <h5>cast</h5>
            <div className="embla">
<div className="embla__viewport" ref={viewportRef}>
  <div className="embla__container">
                    {cast.map((cast) => {
                        return <div className='cast-card'>
                            <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt='image' />
                            <div className='cast-name'>
                                <span>{cast.original_name}</span>
                                <span>{cast.character}</span>
                            </div>
                        </div>
                    })}
                            </div>
                            </div>
<button className="embla__button_prev" onClick={scrollPrev}>
&lt;
</button>
<button className="embla__button_next" onClick={scrollNext}>
&gt;
</button>
</div>
                </div>

                
        
        </div>
     
    );
}

export default MovieDetail

