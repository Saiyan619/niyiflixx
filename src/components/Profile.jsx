import React from 'react';
import { useState, useEffect } from 'react';
import backImg from '../assets/netflix-background-gs7hjuwvv2g0e9fj.jpg';
import { UserAuth } from '../context/AuthContext';
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../utils/Firebase';
import '../components/profile.scss';
import filledLove from '../assets//icons8-love-24(1).png';
// import SavedMoviesCard from './SavedMoviesCard';

const Profile = () => {
  
  const [Movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favMovies);
      });
    }
  }, [user?.email]);
  console.log()

  const handleUnliKe = async (movie) => {
    
    const userDoc = doc(db, "users", user.email);
    
    await updateDoc(userDoc, {
      favMovies: arrayRemove(movie)
    });
  }
  
  console.log(Movies);
  return (
    <div className='profile-container'>


<img src={backImg} className='background' alt='image' />

      <div className='profile-sub-container'>
        <div className='user-dets'>
          <img className='user-logo' src='/src/assets/icons8-user-50.png' alt='user' />
          {user.email}
        </div>
        <h5>my liked shows</h5>
      
        <div className='saved-shows-con'>
          {Movies.map((card) => (
            <div className='card'>
              <div className='overlay'></div>
              <img src={`https://image.tmdb.org/t/p/original${card.poster_path}`} alt='image' />
              <span className='card-name'>{card.original_title}</span>
              <div className='card-details'>
                <p>{card.genre_ids[0] === 12 ? 'Adventure.' :
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
                  <img onClick={() =>handleUnliKe(card)} className='love' src={filledLove} alt='icon' />
                  <span className='check-button'>check</span>
                </div>
              </div>
        
            </div>
          ))
          }
        </div>

      
      </div>
    </div>
  

  )
}
export default Profile
