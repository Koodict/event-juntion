import React, { useEffect, useState } from 'react'
import { RiTeamFill } from "react-icons/ri";
import { FaHotel } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export default function HeroSection() {

// const [show , setShow] = useState(false)



// useEffect(()=>
// {

//   const isModal = localStorage.getItem('isModalShown')
//   if(!isModal)
//     {
//       setShow(true)
// localStorage.setItem('isModalShown' , 'true')
//     }

// },[])

// const handleClose = () => setShow(false);


  return (
    <>
    
    <div className='heroImg'>
<div className=" container">
  <div className="homeText" data-aos="fade-up"
     data-aos-duration="1000">
 
  <h1 className='heroHeading1'>Get An Unforgettable<br /> <span className='Herotextcolor'> Event Experience</span> with Us </h1>
  <div>
<ul className='heroUl'>
  <li>Community</li>
  <li>Organization</li>
  <li>Families</li>
  <li>School</li>
  <li>Corporate</li>
</ul>

  </div>
 
  <div>

  <button className='logBtn  '> <Link to='about' className='heroTextBtn' >About</Link></button>
  
  <button className='logBtn'> <Link to='services' className='heroTextBtn' >Services</Link></button>                      
    </div>
  </div>


<div className="container  ">
  <div className="row">
    <div className="col col-md-4 col-12 " data-aos="fade-up"
     data-aos-duration="1000">
<div className="card grid boxShadow rounded-4 p-4 border-0 mt-4"style={{aspectRatio:'3/2'}}>
<FaHotel style={{fontSize:'70px', color:'#ffbe0b'}}/>
<div className='text-center'>

<h2 style={{color:'#2E444f'}} > Best Venues</h2>
<p style={{color:'#787878'}}>Discover perfect venue for your event. Our selection of top-notch locations ensures a stunning backdrop for any occasion.</p>
</div>
</div>

    </div>
    <div className="col col-md-4 col-12"data-aos="fade-up"
     data-aos-duration="2000">
<div className="card grid  boxShadow rounded-4 p-4 border-0 mt-4"style={{aspectRatio:'3/2'}}>
<GiDiscussion style={{fontSize:'70px', color:'#ffbe0b'}}/>
<div className='text-center'>

<h2 style={{color:'#2E444f'}}>Awesome Event</h2>
<p style={{color:'#787878'}}>Experience an event like no other. Our expertise in event planning guarantees a seamless and spectacular experience.</p>
</div>
</div>

    </div>
    <div className="col col-md-4 col-12" data-aos="fade-up"
     data-aos-duration="3000">
<div className="card grid boxShadow rounded-4 p-4 border-0 mt-4"style={{aspectRatio:'3/2'}}>
<RiTeamFill style={{fontSize:'70px', color:'#ffbe0b'}}/>
<div className="text-center">

<h2 style={{color:'#2E444f'}}>Friendly Team</h2>
<p style={{color:'#787878'}}>Work with a team that truly cares. Our friendly and professional staff are dedicated to making your event a success.</p>
</div>
</div>

    </div>
  </div>
</div>



</div>
</div>
    
   
    
 
    
    
    
    </>
  )
}
