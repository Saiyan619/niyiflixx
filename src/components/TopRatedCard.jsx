import React from 'react'
import { useState, useEffect } from 'react';
import '../components/topratedcard.scss'
import filledLove from '../assets//icons8-love-24(1).png';
import { Link } from 'react-router-dom';
import Love from '../assets//icons8-love-24.png';
import { UserAuth } from '../context/AuthContext';
import { arrayUnion, onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../utils/Firebase';


const TopRatedCard = ({ card }) => {
  const [showMovies, setshowMovies] = useState([])
  const [like, setlike] = useState(true);
  
  const { user } = UserAuth();
  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setshowMovies(doc.data().favMovies);
      });
    }
  },[user?.email])

  console.log(showMovies);
  
  const handleLikeMovies = async () => {
    console.log(card.id)
    const userEmail = user?.email;
   
    if (userEmail) {
      const userDoc = doc(db, "users", userEmail)
      setlike(!like);
      await updateDoc(userDoc, {
        favMovies:arrayUnion({...card})
      })
    } 
    else {
      alert('Please Sign in or Log in to like a movie')
    }
  }

  const handleUnliKe = async (movie) => {
    
    const userDoc = doc(db, "users", user.email);
    
    await updateDoc(userDoc, {
      favMovies: arrayRemove(movie)
    });
  }
  

  return (
    <div>
    <div className='card'>
      <div className='overlay'></div>
      <img src={`https://image.tmdb.org/t/p/original${card.poster_path}`} alt='image' />
      <span className='card-name'>{card.original_title}</span>
      <div className='card-details'>
        <p>{ card.genre_ids[0] === 12 ? 'Adventure.' :
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
                card.genre_ids[0] === 878 ? 'Science Fiction.' : ""}</p>

<div className='card-sub-details'>
            {showMovies && (showMovies.some((liked) => liked.id === card.id) ) ?
              <img onClick={()=>handleUnliKe(card)} className='love' src={filledLove} alt='icon' /> :
              <img onClick={handleLikeMovies} className='love' src={Love} alt='icon' />
            }  
            <span className='check-button'><Link to={`movieDetails/:${card.id}`}>check</Link></span>
      </div>
        </div>
        </div>
    </div>
  )
}

export default TopRatedCard;
  {/* {card.original_title}
      <p>genre_ids</p>
      <span>+</span>
      <button>Check</button> */}