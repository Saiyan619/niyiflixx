import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const { user } = UserAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/')
    }
  return children
}

export default ProtectedRoutes
