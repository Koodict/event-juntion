import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About'
import Home from './Home'
import Contact from './Contact'
import PublicEvents from './PublicEvent'
import NoPage from '../NoPage'
import MyJoin from './MyJoinEvents'
import Services from './Services'
import { AuthContext } from '../../context/AuthContext'
import UpcomingEvent from './UpcomingEvent'
import Payment from './PaymentPage'


export default function Index()

{


  return (
    <>
    
   

<main>

    <Routes>

<Route path='/'>

{


<>
<Route index element={<Home/>}/>
<Route path='about' element={<About/>}/>
<Route path='contact' element={<Contact/>}/>
<Route path='services' element={<Services/>}/>
<Route path='publicEvent' element={<PublicEvents/>}/>
<Route path='myjoinEvents' element={<MyJoin/>}/>
<Route path='UpcomingEvent' element={<UpcomingEvent/>}/>
<Route path='payment' element={<Payment/>}/>

</>

}
<Route path='*' element={<NoPage/>}/>

</Route>



    </Routes>
    
</main>
    
  
    </>
  )
}
