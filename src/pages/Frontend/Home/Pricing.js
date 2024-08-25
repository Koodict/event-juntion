import React from 'react'
import {pricingData }from './cardData'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
export default function Pricing() {
  return (
    <>
    
    <div className="  pricing-plan">
<div className="container">
  <div className="row">
    <div className="col col-8 offset-2 mt-5 "  data-aos="fade-up"
     data-aos-duration="1000">
<p>Pricing & Plan</p>
<h3>We Have Special Price For You</h3>
<p>Explore our tailored pricing plans designed to fit your unique needs and budget. Whether you're planning an intimate gathering or a grand celebration, we offer packages that ensure exceptional value and unforgettable experiences.</p>

    </div>
  </div>

  <div className="row">
      <div className="col">
        <div className="row"> 
{pricingData.map((data , i)=>


(   <div key={i} className="col-12 col-md-6 col-xl-3 mb-4" data-aos="zoom-in"
data-aos-duration="1000">

<div className="card  pricing-card">
<h3>{data.name}</h3>
<h2>{data.Price}</h2>
<ul>
  <li> <FaCheckCircle className='pricing-icon' />{data.option1}</li>
  <li> <FaCheckCircle  className='pricing-icon' />  <span></span>{data.option2}</li>
  <li><FaCheckCircle  className='pricing-icon'/> <span></span>{data.option3}</li>
  <li> <FaCheckCircle  className='pricing-icon'/> <span></span>{data.option4}</li>
  <li> <FaCheckCircle  className='pricing-icon'/> <span></span>{data.option5}</li>
  <li><FaCheckCircle  className='pricing-icon'/> <span> </span>{data.option6}</li>
</ul>
<Link to='/payment' className='logBtn'>GET IN TOUCH</Link>



</div>


</div>

)



)}

</div>


  </div>
</div>


</div>
</div>
    
    
    
    
    </>
  )
}
