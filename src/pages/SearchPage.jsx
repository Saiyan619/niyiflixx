import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../pages/search.scss'

const SearchPage = () => {
    const [SearchedMovie, setSearchedMovie] = useState([]);
    const [searchInput, setsearchInput] = useState('')
    const Apikey = "0e2d4610ab50a39abec05e21b91b1cc4";
    const baseUrl = "https://api.themoviedb.org/3"
    // const searchTerm = 'naruto'

    // `https://api.themoviedb.org/3/search/multi?&api_key=${API_KEY}&query=${searchTerm}`
    // search/keyword
    const getSearch = () => {
        axios.get(`https://api.themoviedb.org/3/search/multi?&api_key=${Apikey}&query=${searchInput}`).then((response) => {
          let result = response.data.results;
            console.log(result);
            setSearchedMovie(result);
          })
    }

    // useEffect(() => {
    //     getSearch();
    // }, [searchInput]);

    function handleSearchInput(e) {
        let search = e.target.value;
        setsearchInput(search)
    }
    console.log(searchInput)
    
    
  return (
    <div className='back-color'>
      <div className='main-search-container'>
      <div className='sub-search-container'>
        <div className='input-btn-container'>
        <input onChange={handleSearchInput} type="text" value={searchInput} placeholder='enter movie here....' />
        <button onClick={getSearch}>find</button>
        </div>
           
        <div className='search-container'>
              {SearchedMovie.map((card) => {
                  return <div className='card'>
                  <div className='overlay'></div>
                  <img src={`https://image.tmdb.org/t/p/original${card.poster_path}`} alt='image' />
                      <span className='card-name'>{card.name ||  card.title}</span>
                  <div className='card-details'>
                    {/* <p>{ card.genre_ids[0] === 12 ? 'Adventure.' :
                          card.genre_ids[0] === 28 ? 'Action.' :
                            card.genre_ids[0] === 16 ? 'Animation.' :
                            card.genre_ids[0] === 35 ? 'Comedy.' :
                            card.genre_ids[0] === 14 ? 'Fantasy.' :
                            card.genre_ids[0] === 10749 ? 'Romance.' :
                            card.genre_ids[0] === 99 ? 'Documentary' :
                            card.genre_ids[0] === 80 ? 'Crime.' :
                            card.genre_ids[0] === 18 ? 'Drama.' :
                            card.genre_ids[0] === 36 ? 'History.' :
                            card.genre_ids[0] === 10402 ? 'Music.' :
                            card.genre_ids[0] === 27 ? 'Horror.' :
                            card.genre_ids[0] === 878 ? 'Science Fiction.' : ""}</p> */}
            
                    <div className='card-sub-details'>
                        {/* {showMovies && (showMovies.some((liked) => liked.id === card.id) ) ?
                          <img onClick={()=>handleUnliKe(card)} className='love' src={filledLove} alt='icon' /> :
                          <img onClick={handleLikeMovies} className='love' src={Love} alt='icon' />
                        }   */}
                        <span className='check-button'><Link to={card.media_type === 'movie' ? `movieDetails/:${card.id}` :  `searchDetails/:${card.id}` }>check</Link></span>
                  </div>
                    </div>
                    </div>
              })}
          </div>
          </div>
          </div>
         
      </div>
    
  )
}

export default SearchPage
