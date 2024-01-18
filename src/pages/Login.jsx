import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../pages/login.scss';
import backImg from '../assets/netflix-background-gs7hjuwvv2g0e9fj.jpg';
import { UserAuth } from '../context/AuthContext';


const Login = () => {
  const { user, login } = UserAuth();
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  function handleEmail(e) {
    setemail(e.target.value);
    console.log(e.target.value)
  }
  function handlePassword(e) {
    setpassword(e.target.value);
  }
  const handleSubmit = async ()=> {
    try {
      await login(email, password);
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
      <div>
<img src={backImg} className='background' alt='image' />
    <div className='signup-main-container'>
    <div className='signup-sub-main-container'>
      <span className='signup'>login</span>
      <input type="email" onChange={handleEmail} value={email} className= 'email-password-input' placeholder='Email'/>
      <input type="password" onChange={handlePassword} value={password}  className='email-password-input' placeholder='password' />
      <button onClick={handleSubmit}>Login</button>
      <div className='remember-me'>
        <div className='remember-me-1'>
            <input type="checkbox" name="" id="" /><span>Remember me</span>
            </div>
        <span>Need Help?</span>
      </div>
      <p>Don't have an account?<Link to='/signup'> Sign Up</Link></p>
      </div>
      </div>
  </div>
      

  )
}

export default Login
