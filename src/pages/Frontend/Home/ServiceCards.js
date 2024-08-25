import React from 'react'
import { FiArrowRightCircle } from "react-icons/fi";
import  {venueData} from './cardData';


export default function ServiceCards() 
{
  return (
    <>
    
    <div className="container">  
  <div className="row mt-5">
    <div className="col col-12 text-center mb-5 mt-5 "data-aos="fade-up"
     data-aos-duration="800">

      <h3 className='textColor'>Our Services</h3>
      <h2 className='service-heading' >We Provide The Best Service For Your Event</h2>
      <p>We are dedicated to making your event a memorable experience. Our comprehensive services <br />ensure every detail is taken care of, so you can focus on enjoying your special occasion. </p>
    </div>
    </div>    

    <div className="row">
      <div className="col">
        <div className="row">
          {venueData.map((card, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4 mb-4"data-aos="zoom-in"
            data-aos-duration="1000">
              <div className="card cardShadow" style={{aspectRatio:'2/2'}}>
                <div className='cardContent'>
                  <div className='icon-size'>{card.icon}</div>
                  <div className="card-body">
                    <h5 className="card-title">{card.name}</h5>
                    <p>{card.detail}</p>
                    <a href="#" className="w-75">Read More <FiArrowRightCircle /></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    
    
    </>
  )
}
