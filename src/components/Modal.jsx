import React from 'react'
import '../components/modal.scss'
const Modal = ({handleLogout, openModal}) => {
  return (
    <div className='modal_main-container'>
          <div className='modal_sub-container'>
              <span>Are you sure you want to Log Out?</span>
             <div className='option-btns'>
              <button onClick={handleLogout}>Yes</button>
              <button onClick={openModal}>No</button>
              </div>
      </div>
    </div>
  )
}

export default Modal
