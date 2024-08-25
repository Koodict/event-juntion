import { signOut } from 'firebase/auth'
import React, { useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { auth} from '../../../../Config/firebase'
import { AuthContext } from '../../../../context/AuthContext'
import { VscThreeBars } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { BsCartFill } from "react-icons/bs";
import {MdAccountCircle} from 'react-icons/md'
import Avatar    from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles';

export default function MainHeader() 


{


  const {isAuthenticated , dispatch , setActiveStep , setSearch } = useContext(AuthContext)



 

//////////////////////////////////

    const handleLogout = ()=>
  {
  signOut(auth)
  
    .then(()=>
    {
      dispatch({type:'LOGOUT'})
     window.notify('Logout Successfully' , 'success')
  
    })
    
  .catch = (error) => {
  console.error(error)
  }
  }
  

  const firstletter = localStorage.getItem('proLetter');



const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));



  return (
    <>
       <header>
    <nav className= ' navbar  navbar-expand-sm  bg-white fixed-top p-4 p-lg-1' >

 <div className="container">

 
    <Link to='/' className="navbar-brand d-none d-lg-block  mb-0" href="#"><img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/Event%20(1).png?alt=media&token=90189dca-3aa4-458a-ae13-a3437ad9ce76" height={60}  alt="" /></Link>
      

    <VscThreeBars  className=" fs-2  d-block d-lg-none" style={{cursor:'pointer'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" />

<div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
      <ul className="navbar-nav me-5 ">
 
<li className="nav-item"><Link  to='/AdminDash/joinEvent'className="nav-link  mt-2 m-1 fw-bold d-none  d-lg-block"aria-current="page" >Manage Event</Link></li>

<li className="nav-item"><Link to='/AdminDash/eventShow'className="nav-link fw-bold   mt-2  m-1 d-none  d-lg-block">My Events</Link></li>
    
        <li className="nav-item">
          <Link to='/AdminDash/eventPage' className="nav-link   mt-2 fw-bold m-1 d-none d-lg-block" onClick={()=>setActiveStep(0)}>Create Event</Link>
        </li>
        <li className="nav-item">
          <Link to='/AdminDash/ticketManage' className="nav-link   mt-2 fw-bold m-1 d-none d-lg-block" onClick={()=>setActiveStep(0)}>Ticket Manage</Link>
        </li>
        <li className="nav-item " >
        <a className="nav-link active fs-5 offset-5"><BsSearch className=' mt-2 d-none d-lg-block cursor-pointer'   data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"/></a>
        
        </li>
  
        <div>
        {!isAuthenticated
        ? 
        <>
        <li className="nav-item  fmf2">
        <div className="card  border-0">
          
        <a className="nav-link active fs-5 boxShadow" href="#" data-bs-toggle="dropdown" aria-expanded="false"><MdAccountCircle className=' d-none d-sm-block ' /></a>

        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-star">
    <li><Link className="dropdown-item" to='/authentication/login'>Login</Link></li>
    <li><Link className="dropdown-item" to='/authentication/register' >Register</Link></li>
   
  </ul>
          </div>
        </li>
        </>
         
        :<>
        
        <li className="nav-item  fmf4">
        <div className="  p-sm-2 p-md-0 ">
          
        <div className="nav-link active fs-5 "  href="#" data-bs-toggle="dropdown" aria-expanded="false"> 
        <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot">
 <Avatar
  style={{ cursor: 'pointer' }}
  className={
    firstletter === 'M' ||
    firstletter === 'A' ||
    firstletter === 'B' ||
    firstletter === 'C' ||
    firstletter === 'D'
      ? 'bg-danger'
      : firstletter === 'E' ||
        firstletter === 'F' ||
        firstletter === 'G' ||
        firstletter === 'H' ||
        firstletter === 'I'
      ? 'bg-primary'
      : firstletter === 'J' ||
        firstletter === 'K' ||
        firstletter === 'L' ||
        firstletter === 'N'
      ? 'bg-secondary'
      : firstletter === 'O' ||
        firstletter === 'P' ||
        firstletter === 'R' ||
        firstletter === 'S' ||
        firstletter === 'T'
      ? 'bg-success'
      : firstletter === 'U' ||
        firstletter === 'V' ||
        firstletter === 'W' ||
        firstletter === 'X' ||
        firstletter === 'Y' ||
        firstletter === 'Z'
      ? 'bg-info'
      : ''
  }
>
  {firstletter}
</Avatar>

   
    </StyledBadge>

 </div>
  
          <ul className="dropdown-menu">
      <li><Link className="dropdown-item" to='/'>Switch to Attending</Link></li>
      <li> <Link to='/'  className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
     
    </ul>
            </div>
    

        </li>
       
        </>
      
      }

        </div>
      </ul>
      </div>
    </div>
</nav> 



 <div className="offcanvas offcanvas-start  d-lg-none d-block  off-width  " data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header ms-5">
  <Link to='/' className="navbar-brand d-block d-lg-none  mb-0" href="#"><img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/Event%20(1).png?alt=media&token=90189dca-3aa4-458a-ae13-a3437ad9ce76" height={80}  alt="" /></Link>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body d-lg-none d-block offset-1 offset-md-3">
    
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  <li className="nav-item"><Link  to='/AdminDash/joinEvent'className="nav-link  mt-2 m-1 fw-bold "aria-current="page" >Manage Event</Link></li>
  <li className="nav-item"><Link to='/AdminDash/eventShow'className="nav-link fw-bold   mt-2  m-1 ">My Events</Link></li>
  <li className="nav-item">
          <Link to='/AdminDash/eventPage' className="nav-link   mt-2 fw-bold m-1 " onClick={()=>setActiveStep(0)}>Create Event</Link>
        </li>
        <li className="nav-item">
          <Link to='/AdminDash/ticketManage' className="nav-link   mt-2 fw-bold m-1 " onClick={()=>setActiveStep(0)}>Ticket Manage</Link>
        </li>
        <div className="input-group  mx-auto">
  <input type="search" className="form-control" placeholder="Search Event" onChange={(e) => setSearch(e.target.value)}/>
  
</div>
</ul>

  </div>
</div> 
<div className="offcanvas offcanvas-top off-height " tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
    
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  <div className="container">
    <div className="row">
      <div className="col col-lg-8 col-12  mx-auto">
  <div className="input-group  mx-auto">
  <input type="search" className="form-control" placeholder="Search Event" onChange={(e) => setSearch(e.target.value)}/>
</div>
      </div>
    </div>
  </div> 
  </div>
</div>
</header>
       
    </>
  )
}

