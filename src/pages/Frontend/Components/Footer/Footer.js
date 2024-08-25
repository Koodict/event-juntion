import React from 'react'
import{ GrFacebookOption }from 'react-icons/gr'
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineTwitter} from 'react-icons/ai'
import {BsGithub} from 'react-icons/bs'
import { SiPolkadot } from "react-icons/si";
import { BsNewspaper } from "react-icons/bs";
import { BsDeviceSsd } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
    
    <footer className=" text-white"   >
        <div className="container" >
          <div className="row">
          <div className="col col-12 col-xl-3 col-md-6">
<br /><br />
<div className='d-flex gap-2'>

   <div className='box grid ' style={{height:'50px', width:'50px', borderRadius:'100px', border:'2px solid #ffbe0b'}}>
    <div className='grid '>
   <SiPolkadot className='fs-3' style={{color:'#ffbe0b'}} />
    </div>
   </div>
<h3 className='text-white'>About</h3>
</div>
  
<div className='d-flex mt-4 gap-2'>
<FaMapMarkerAlt className='fs-3' style={{color:'#ffbe0b'}}/>
 House no 338, near jawalanagar Phatak samanabad Faisalabad 
</div>
<div className='d-flex mt-4 gap-2'>
<FaPhoneAlt className='fs-3' style={{color:'#ffbe0b'}}/>
 +9203016613599 
</div>        
<div className='d-flex mt-4 gap-2'>
<SiMinutemailer className='fs-3' style={{color:'#ffbe0b'}}/>
 <a href=" usamairsahd9192@gmail.com" style={{color:'#ffbe0b'}}>usamairsahd9192@gmail.com</a>
</div> 
<div class="input-group mt-4">
  <input type="text" className="form-control bg-dark text-white" placeholder="Enter Email Address"/>
  <button class="btn btn-warning" type="button"><SiMinutemailer className='fs-3' /></button>
</div>
     </div>
     <div className="col col-12 col-xl-3 col-md-6">
<br /><br />
<div className='d-flex gap-2'>

   <div className='box grid' style={{height:'50px', width:'50px', borderRadius:'100px', border:'2px solid #ffbe0b'}}>
    <div className='grid'>
   <BsNewspaper className='fs-3' style={{color:'#ffbe0b'}} />

    </div>
   </div>
   <h3 className='text-white'>Latest News</h3>
</div>
   
   <div className='mt-4 d-flex gap-2'>

<img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/f1img.jpg?alt=media&token=2ae05cba-f9d4-4c04-90b1-713299019d2a" alt="" style={{aspectRatio:'3/2',width:'30%',objectFit:'cover',borderRadius:'10px'}} />
<p>Even the all-powerful pointing has no control about</p>
</div>
<div className='mt-4 d-flex gap-2'>

<img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/f2img.jpg?alt=media&token=83fb0bba-5247-43ae-a33d-90d46d71dbe5" alt="" style={{aspectRatio:'3/2',width:'30%',objectFit:'cover',borderRadius:'10px'}} />
<p>Even the all-powerful pointing has no control about</p>
</div>    
     </div>
     <div className="col col-12 col-xl-3 col-md-6">
<br /><br />
<div className='d-flex gap-2'>

   <div className='box grid' style={{height:'50px', width:'50px', borderRadius:'100px', border:'2px solid #ffbe0b'}}>
    <div className='grid'>
   <BsDeviceSsd className='fs-3' style={{color:'#ffbe0b'}} />

    </div>
   </div>
   <h3 className='text-white'>Information</h3>
</div>
   <div className='mt-4 '>
    <Link to='/'><p className='text-warning'>Home</p> </Link>
    <Link to='/about'><p className='text-warning'>About</p> </Link>
    <Link to='/services'><p className='text-warning'>Services</p> </Link>
    <Link to='/Contact'><p className='text-warning'>Contact</p> </Link>
    <Link to='/Find Event'><p className='text-warning'>Find Event</p> </Link>

   </div>

          
     </div>
     <div className="col col-12 col-xl-3 col-md-6">
<br /><br />
<div className='d-flex gap-2'>

   <div className='box grid' style={{height:'50px', width:'50px', borderRadius:'100px', border:'2px solid #ffbe0b'}}>
    <div className='grid'>
   <FaInstagram className='fs-3' style={{color:'#ffbe0b'}} />

    </div>
</div>
<h3 className='text-white'>Instagram</h3>
   </div>
   <div className='mt-4 d-flex gap-2'>

<img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/920a6c40-d589-4749-81e7-99c5530e7964-thumb.jpg?alt=media&token=e0eced10-86d2-43a9-8f5d-c8bd72658543" alt="" style={{aspectRatio:'3/2',width:'30%',objectFit:'cover',borderRadius:'10px'}} />
<img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/d608854aa2bceb32206f5da2addb7552.jpg?alt=media&token=d5e2027c-2c0b-4dd6-9980-5c3b90c11ae6" alt="" style={{aspectRatio:'3/2',width:'30%',objectFit:'cover',borderRadius:'10px'}} />

<img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/event-venue-1597531_1280.jpg?alt=media&token=69df20c4-27ea-4f5e-96df-edcbaf89b06e" alt="" style={{aspectRatio:'3/2',width:'30%',objectFit:'cover',borderRadius:'10px'}} />

</div>  
<div className='mt-4 d-flex gap-2'>

<img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/home-bottom.jpg?alt=media&token=b007c338-dc6d-4374-8522-18bbfbc5c776" alt="" style={{aspectRatio:'3/2',width:'30%',objectFit:'cover',borderRadius:'10px'}} />

<img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/images.jpg?alt=media&token=003ae59a-c60b-4396-b534-29ccf0114844" alt="" style={{aspectRatio:'3/2',width:'30%',objectFit:'cover',borderRadius:'10px'}} />

<img src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/pexels-cottonbro-studio-4865513.jpg?alt=media&token=485a9836-eeaa-414d-9db7-be5d7d970a4d" alt="" style={{aspectRatio:'3/2',width:'30%',objectFit:'cover',borderRadius:'10px'}} />

</div>  
          
     </div>
           
            </div>
            </div>
          </footer>
    
    </>
  )
}
