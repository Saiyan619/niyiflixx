import React from 'react';
import { useState } from 'react';
import '../pages/signup.scss'
import { Link, useNavigate } from 'react-router-dom'
import backImg from '../assets/netflix-background-gs7hjuwvv2g0e9fj.jpg';
import { UserAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/Firebase';
import toast, { Toaster } from 'react-hot-toast';


const SignUp = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  function handleEmail(e) {
    setemail(e.target.value);
    console.log(e.target.value)
  }
  function handlePassword(e) {
    setpassword(e.target.value);
  }

  const {user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const notify = () => toast('Signed In😁');
    try {
      await signUp(email, password);
      setDoc(doc(db, "users", email),{
        favMovies: [],
      })
      
        navigate('/')
        notify()
      
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div>
    <img src={backImg} className='background' alt='image' />
        <div className='signup-main-container'>
        <div className='signup-sub-main-container'>
          <span className='signup'>signup</span>
          <input type="email" onChange={handleEmail} value={email} className='email-password-input' placeholder='Email'/>
          <input type="password" onChange={handlePassword} value={password} className='email-password-input' placeholder='password' />
          <button onClick={handleSubmit}>Signup</button>
          <div className='remember-me'>
            <div className='remember-me-1'>
                <input type="checkbox" name="" id="" /><span>Remember me</span>
                </div>
            <span>Need Help?</span>
          </div>
          <p>Already have an account?<Link to='/login'>login</Link></p>
          </div>
          </div>
      </div>
  )
}

export default SignUp
