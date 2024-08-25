import { signOut } from 'firebase/auth'
import React, { useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { auth} from '../../../../Config/firebase'
import { AuthContext } from '../../../../context/AuthContext'
import { VscThreeBars } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import {MdAccountCircle} from 'react-icons/md'
import Avatar    from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles';

export default function Navbar() 


{


  const {isAuthenticated , dispatch ,  search , setSearch } = useContext(AuthContext)



  const scrollUp = () =>
  {
      window.scrollTo({
          top : 0,
          
      })
  }

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
    <nav className= ' navbar  navbar-expand-sm  bg-white fixed-top p-3  p-md-3 p-lg-1' >

 <div className="container">

 
    <Link to='/' className="navbar-brand d-none d-lg-block  mb-0" href="#"><img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/Event%20(1).png?alt=media&token=90189dca-3aa4-458a-ae13-a3437ad9ce76" height={60}  alt="" /></Link>
      

    <VscThreeBars  className=" fs-2  d-block mt-1 d-lg-none" style={{cursor:'pointer'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" />

<div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
      <ul className="navbar-nav me-5 ">
 
<li className="nav-item"><Link  to='/' onClick={scrollUp} className="nav-link  mt-2 m-1 fw-bold d-none  d-lg-block"aria-current="page" >HOME</Link></li>

<li className="nav-item"><Link to='/about' onClick={scrollUp} className="nav-link fw-bold   mt-2  m-1 d-none  d-lg-block">About</Link></li>
    
        <li className="nav-item">
          <Link to='/services' onClick={scrollUp} className="nav-link   mt-2 fw-bold m-1 d-none d-lg-block">Services</Link>
        </li>
    <li>
    
    </li>
  <li className="nav-item">
  <Link  to='/contact'  onClick={scrollUp} className="nav-link  mt-2 fw-bold  m-1 d-none d-lg-block">Contact</Link>
        </li>
        <li className="nav-item">
  <Link  to='/publicEvent' onClick={scrollUp} className="nav-link  mt-2 fw-bold m-1 d-none  d-lg-block">Find Event</Link>
        </li>
        <li className="nav-item">
  <Link  to='/UpcomingEvent' onClick={scrollUp} className="nav-link  mt-2 fw-bold m-1 d-none  d-lg-block">Upcoming Events</Link>
        </li>
        <li className="nav-item">
  <Link  to='/myjoinEvents' onClick={scrollUp} className="nav-link  mt-2 fw-bold m-1 d-none  d-lg-block">joined Events</Link>
        </li>
        <li className="nav-item " >
        <a className="nav-link active fs-5 "><BsSearch className='mt-2 d-none  d-lg-block cursor-pointer'   data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"/></a>
        
        </li>
        
    
        <div>
        {!isAuthenticated
        ? 
        <>
        <li className="nav-item  fmf2">
        <div>
          
        <a className="nav-link active " href="#" data-bs-toggle="dropdown" aria-expanded="false"><MdAccountCircle className='text-warning fs-1'/></a>

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
  
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-star">
      <li><Link className="dropdown-item" to='/AdminDash/eventShow'>Manage my Event</Link></li>
      <li> <Link  to='/' className="dropdown-item"  onClick={handleLogout}>Logout</Link></li>
     
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
        <li className="nav-item">
     <div  onClick={scrollUp} className='text-decoration-none'><Link to='/'className="nav-link mt-2 m-1 fw-bold "  >Home</Link></div> 
        </li>
    
        <li className="nav-item">
          <div onClick={scrollUp} className='text-decoration-none'></div><Link to='/about'className="nav-link mt-2 m-1  fw-bold">About</Link>
        </li>

        <li className="nav-item">
          <div onClick={scrollUp} className='text-decoration-none'></div><Link to='/services'className="nav-link mt-2 m-1  fw-bold" >Service</Link>
        </li>
        <li className="nav-item">
          <div onClick={scrollUp} className='text-decoration-none'></div><Link to='/contact'className="nav-link mt-2 m-1  fw-bold" >Contact</Link>
        </li>

        <li className="nav-item">
        <div onClick={scrollUp} className='text-decoration-none'> <Link to='/publicEvent' className="nav-link mt-2 m-1 fw-bold " >Find Events</Link></div>
</li>
<li className="nav-item">
        <div onClick={scrollUp} className='text-decoration-none'> <Link to='/UpcomingEvent' className="nav-link mt-2 m-1 fw-bold " >Upcoming Events</Link></div>
</li>
<li className="nav-item">
        <div onClick={scrollUp} className='text-decoration-none'> <Link to='/myjoinEvents' className="nav-link mt-2 m-1 fw-bold " >Joined Events</Link></div>
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


