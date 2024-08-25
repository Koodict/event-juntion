import React from 'react'

export default function ContactSection() {
  return (
    <>
    
    
    
    <div className="container mt-4">


  <div className="row d-flex align-items-center">
  
 <div className="col col-12 col-md-6 col-lg-5 mb-5"data-aos="fade-up">
 
<p className=' fw-bold fs-5'>HAVE QUESTION?</p>
<h1 className='fs-1'>Contact Us</h1>
  <p>Address : Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quo provident voluptates ut.</p>
  <p>Phone : 5829416613599</p>
  <p>Email :  Coder27@gmail.com</p>
  
</div>
  


<div className="col col-12 col-md-6 col-lg-7   ">
<div data-aos="fade-up">
 <div className='contactBox w-100 p-4 mb-5 rounded-3' >
 <div className="container-fluid">
      <div className="row">
        <div className="col col-12 col-sm-6 ">
  
    <div className="input-group">

<input type="text" className=' w-100 bottomInput' placeholder='First Name' />
</div>
        </div>
        <div className="col  col-12 col-sm-6 mt-sm-0 mt-5">
<input type="text" className=' w-100  bottomInput'placeholder='Last Name' />

        </div>
      </div>
      <div className="row">
        <div className="col  col-12 col-sm-6 mt-sm-5 mt-5">
  
    <div className="input-group">

<input type="email" className=' w-100 bottomInput' placeholder='email' />
</div>
        </div>
        <div className="col  col-12 col-sm-6 mt-sm-5 mt-5 ">
<input type="number" className=' w-100  bottomInput'placeholder='Your number' />

        </div>
      </div>
      <div className="row">
        <div className="col col-12 mt-sm-5 mt-4">
  
    <div className="input-group">

    <textarea className=' mt-3   w-100  ' cols="10" rows="3" placeholder='Your Message'></textarea>
    <button className='logBtn rounded-5 p-2 w-100 mt-4  '>SEND MESSAGE</button>
</div>
        </div>
     
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
