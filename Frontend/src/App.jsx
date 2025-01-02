import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassord'
import ResetPassword from './Pages/ResetPassword'
import VerifyEmail from './Pages/VerifyEmail'
import PageNotFound from './Pages/PageNotFound'
import Dashboard from './Pages/Dashboard'
import UserChangeOldPassword from './Pages/UserChangeOldPassword'

function App() {

  return (
    <>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/change-old-password' element={<UserChangeOldPassword/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/not-found' element={<PageNotFound/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App
