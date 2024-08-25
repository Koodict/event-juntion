import React from 'react'
import { Link } from 'react-router-dom'
import animationData from '../../../assests/Animation - 1716138047583.json'
import Lottie from 'lottie-react'
import animationData1 from '../../../assests/Animation - 1716140260166.json'


const EventCreate = () => {
  return (
    <>
    
    <div className='min-vh-100 d-flex justify-content-center align-items-center'style={{backgroundColor:"black"}}>
  <div className="row">
    <div className="col col-12 text-center">
    <div className="card bg-dark mx-auto p-5 shadowBox" style={{ maxWidth: '500px' }}>
    <div className="d-flex justify-content-center position-absolute" style={{top:'-60px'}}>
        <Lottie animationData={animationData1} loop={true} className='w-75'/>
      </div>
<div className="container">
      <div className="d-flex justify-content-center">
        <Lottie animationData={animationData} loop={true} className='w-25' />
      </div>
      <h2 className='mt-3 text-center text-white'>Congratulations</h2>
      <p className='text-center text-white'>Event has been Successfully Created</p>
      {/* <div className="text-center mt-5">
        <Link to='/AdminDash/eventShow' className='btn btn-primary cursor-pointer'>See your Event</Link>
      </div> */}
    </div> 
    </div>

  </div>
</div>


    </div>
    
    </>
  )
}

export default EventCreate