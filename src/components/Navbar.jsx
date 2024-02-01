import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/navbar.scss';
import { UserAuth } from '../context/AuthContext';
import Modal from './Modal';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  
  const [isOpen, setOpen] = useState(true)
  const [closeModal, setcloseModal] = useState(false)
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  function handleOpen() {
    setOpen(!isOpen)
  };

  function openModal() {
    setcloseModal(!closeModal)
    // setOpen(!isOpen)
  }

  const handleLogout = async () => {  
    try {
      await logOut();
      navigate('/');
      setcloseModal(!closeModal)
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div>
      <div  className='navbar-container'>
      <div className='sub-navbar-container-1'>
       <Link to='/'> <span className='logo'>niyiflix</span></Link>
        </div>
        
      <div className={isOpen ? 'sub-navbar-container-2' : 'sub-navbar-container-2_active'}>
        <div className='list-con'>
        <Link onClick={handleOpen} to='/search' className='nav-link'><li>search</li></Link>
        </div>

          {user?.email ?   ( <div className='nav-btns'>
        <button  onClick={handleOpen}  className='btn-login'><Link to='/profile'>profile</Link></button>
          <button onClick={openModal} className='btn-signup'>logout</button>
            <button onClick={handleOpen} className='btn-close'>close menu</button>
            {closeModal ? <Modal handleLogout={handleLogout} openModal={openModal} /> : ''}
            
          </div> ):

(<div className='nav-btns'>
<button onClick={handleOpen} className='btn-login'><Link to='/login'>login</Link></button>
  <button onClick={handleOpen} className='btn-signup'><Link to='/signup'>signup</Link></button>
  <button onClick={handleOpen} className='btn-close'>close menu</button>
  </div>)
          }
      
     </div>
      </div>
      {/* <img className='ham' src='/src/assets/icons8-menu-50.png' alt='ham' /> */}
      
     <div onClick={handleOpen} ><FiMenu size={40} color="black" className='ham'/></div>

    </div>
  )
}

export default Navbar
