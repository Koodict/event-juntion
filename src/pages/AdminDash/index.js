import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import EventPage from '../AdminDash/EventPage'
import EventShow from '../AdminDash/EventShow'
import JoinEvent from '../AdminDash/JoinEvent'
import TicketManage from '../AdminDash/TicketPage/TicketManage'
import EventCreate from './EventCreate/EventCreate'
import PreviewEvent from './PreviewEvent/PreviewEvent'
import MainHeader from './Components/MainHeader/MainHeader'


export default function Index()

{



  return (
    <>
    
   

<main>
<MainHeader/>
    <Routes>

<Route path='/'>

{


<>

<Route path='eventPage' element={<EventPage/>}/>
<Route path='eventShow' element={<EventShow/>}/>
<Route path='joinEvent' element={<JoinEvent/>}/>
<Route path='previewEvent' element={<PreviewEvent/>}/>
<Route path='ticketManage' element={<TicketManage/>}/>
<Route path='eventCreated' element={<EventCreate/>}/>
</>

}


</Route>



    </Routes>
    
</main>
    
  
    </>
  )
}
