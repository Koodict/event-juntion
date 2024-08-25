import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { IoMedalOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';



export default function Experiance() {
  return (
    <>
    
    <div className="container section2-set">
<div className="row"  >
        <div className="col col-lg-6 col-12 order-lg-1 order-2 position-relative"  data-aos="zoom-out"
     data-aos-duration="1000">
        
            <img src='https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/pexels-rick-han-3428289.jpg?alt=media&token=d7aee23c-30f3-4c62-960b-1f0633c72b17'  style={{maxWidth:'80%'}} />

            <img src='https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/pexels-oleksandr-p-3274551.jpg?alt=media&token=bda4aad3-b458-402f-909e-d7240d64642f' style={{maxWidth:'70%',position:'absolute',top:'30%',right:'0',border:'25px solid white'}} />
        </div>
        <div className="col col-12 col-lg-6  mb-5  order-lg-2 order-1" data-aos="zoom-in"
     data-aos-duration="1000">
            <h2>We Are The Best Event Planner & Organizer In Town</h2>
            <p>A new way to explore the world 
                For decades travellers have reached for Lonely Planet books when looking to plan and execute their perfect 
                trip, but now, they can also let Lonely Planet Experiences lead the way
                Learn more</p>
        <div className='row d-flex'>
<div className="col col-12 col-md-6"data-aos="fade-up"
     data-aos-duration="1000">

                <div className='text-start' style={{lineHeight:'40px',width:'280px', fontSize:'14px'}}>
              <ul>
                <li><FaCheckCircle className='iconColor'/> Best Quality Services</li>
                <li><FaCheckCircle className='iconColor'/> 100% Satisfaction Guarantee</li>
                <li><FaCheckCircle className='iconColor'/> Quality Control System</li>
                <li><FaCheckCircle className='iconColor'/> Commitment to Customers</li>
                <li><FaCheckCircle className='iconColor'/> Highly Professional Team</li>
              </ul>

                </div>
</div>
<div className="col col-12 col-md-6"data-aos="fade-up"
     data-aos-duration="1500">


                <div className='bg-light p-4 text-center'>
      
                <h1> <IoMedalOutline/></h1>
                   <h3>5+ Year Experiance</h3>
                </div>
                <div className='mt-4  text-center '>

    <button className='logBtn'> <Link to='/about' className='heroTextBtn' >About US</Link></button>
                </div>
        </div>
</div>
        </div>
      
       </div>
       </div>

    
    
    
    
    
    
    
    
    
    </>
  )
}
