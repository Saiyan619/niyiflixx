import React from 'react'
import { useState } from 'react';
import '../components/savedmoviescard.scss'
import filledLove from '../assets//icons8-love-24(1).png';
import Love from '../assets//icons8-love-24.png';
import { UserAuth } from '../context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/Firebase';

const SavedMoviesCard = ({ card }) => {
  const [like, setlike] = useState(true);

  const { user } = UserAuth();
  const handleLikeMovies = async () => {
    const userEmail = user?.email;
    if (userEmail) {
     const userDoc = doc(db, "users", userEmail)
      setlike(!like);
      await updateDoc(userDoc, {
        favMovies:arrayUnion({...card})
      })
    } else {
      alert('sign in nigga')
    }
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
      <img onClick={handleLikeMovies}  className='love' src={like ? Love :filledLove} alt='icon' />
      <span className='check-button'>check</span>
      </div>
        </div>
        </div>
    </div>
  )
}

export default SavedMoviesCard;
  {/* {card.original_title}
      <p>genre_ids</p>
      <span>+</span>
      <button>Check</button> */}