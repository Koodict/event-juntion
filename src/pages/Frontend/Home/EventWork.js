import React from 'react'
import  {EworkData } from './cardData';
export default function EventWork() {


  return (
    <>
    
    <div className="container mt-5 mb-5">
  <div className="row">
  <div className="col  col-lg-6  col-xl-6 col-12 grid order-2 order-lg-1 setImg"  data-aos="zoom-out"
     data-aos-duration="1000">
    <div className="experiance-img-set grid">
        <img src={'https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/event-work.jpg?alt=media&token=d515c97c-30f5-48d6-a449-dded3ca4f11e'} className='img-div' />
        <div className="inner-div"></div>
    </div>
</div>

    <div className="col col-lg-5 col-xl-6 col-12 second-experiance-section order-1 order-lg-2"  data-aos="fade-up"
     data-aos-duration="1000">
    <p className='heading'>How it Work</p>
    <h2 className='title'>Makes it Easy to Create Your Event .</h2>

    {EworkData.map((data, i)=>


    (  <div key={i}>
  <div className='d-flex align-items-center  gap-3'>
  
  <div style={{fontSize:'40px', color:'#ffbe0b'}}>{data.icon}
  </div>
  <p  className='icon-title'>{data.title}</p>
  </div>
<p className='detail'>{data.detail}</p>

  </div>


  ))}


  
    </div>
    </div>
</div>

    
    </>
  )
}
