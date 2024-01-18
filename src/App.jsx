import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Profile'
import ProtectedRoutes from './components/ProtectedRoutes'
import MovieDetail from './pages/MovieDetail'
import SearchPage from './pages/SearchPage'
import SearchDetail from './pages/SearchDetail'
import Footer from './components/Footer'


function App() {
  

  return (
    <>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />}  />
        <Route path='/login' element={<Login />}  />
        <Route path='/profile' element={<ProtectedRoutes> <Profile /> </ProtectedRoutes>}  />
        <Route path='/' element={<Home />}  />
          <Route path='movieDetails/:id' element={<MovieDetail />} />
          <Route path='search/movieDetails/:id' element={<MovieDetail />} />
          <Route path='search/searchDetails/:id' element={<SearchDetail />} />
          <Route path='search' element={<SearchPage />} />
          
        </Routes>
        <Footer />
        </AuthProvider>
    </>
  )
}

export default App
