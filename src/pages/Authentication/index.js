import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import Login from './Login/Login'
import Register from './Register/Register'

export default function index() {
  return (
    <>
    
    <Routes>

<Route path='/'>

<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/forgot' element={<ForgotPassword/>}/>



</Route>



    </Routes>


    
    
    </>
  )
}
