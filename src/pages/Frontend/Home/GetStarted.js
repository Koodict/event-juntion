import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function GetStarted() {

  const {isAuthenticated , setActiveStep} = useContext(AuthContext)


  return (
    <>
    
    
    
    <div className="consultant-image">
  <div className="container ">
    <div className="row ">
      <div className="col col-12 col-md-6 mt-5 center-data" data-aos="fade-up"
     data-aos-duration="1000">
<h3 className='font-set' >Experience the Power of Professional Event Planning.</h3>
<div>
  {
    !isAuthenticated
    ?
    <Link to='/Authentication/Login' className='logBtn' >Get Started </Link>
    :
    <Link to='/eventPage' className='logBtn' onClick={()=>setActiveStep(0)}>Get Started </Link>
  }

</div>
      </div>
      <div className="col col-12 col-md-6 mt-5 ">
      
<img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/men_prev_ui%20(1).png?alt=media&token=b5d175a8-7cdf-46e4-a4c4-160a7ef8587a" className='imgSet-planning' alt="" />
      </div>
    </div>
  </div>
</div>
   
    </>
  )
}
