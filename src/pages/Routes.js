import React, { useContext  } from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import Authentication from './Authentication'
import { AuthContext } from '../context/AuthContext'
import PrivateRoute from '../components/PrivateRoute'
import LoaderRoute from '../components/LoaderRoute'
import AdminDash from './AdminDash'

export default function Index() {
  
  const {isAuthenticated  } = useContext(AuthContext)
  //  console.log(user)
  

  return (


    
    <BrowserRouter>
    
<Routes>

<Route path='AdminDash/*' element={<LoaderRoute Component={AdminDash} />}/> 
<Route path='/*' element={<LoaderRoute Component={Frontend} />}/> 
<Route path='Authentication/*' element={!isAuthenticated ? <Authentication />:<Navigate to='/' />  }/>
<Route path='Frontend/*' element={<PrivateRoute Component = {Frontend} />} />
<Route path='AdminDash/*' element={<PrivateRoute Component = {AdminDash} />} />

</Routes>
    
    
    
    </BrowserRouter>
  )
}
