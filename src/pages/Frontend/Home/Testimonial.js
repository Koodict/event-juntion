import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation  } from 'swiper/modules';
import { FaQuoteLeft , FaQuoteRight} from "react-icons/fa";
import {SwiperCards} from './cardData';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Testimonial() {
  return (
    <>


<div className="testimonials mb-5">


  <div className="container">
    <div className="row align-items-center">
      <div className="col col-12 info-testimonial" data-aos="fade-up"
     data-aos-duration="1000">
<h3>Testimonials</h3>
<p>What Client Says About</p>
      </div>
    </div>
    <div>  
       <div className="col-12 col-md-10 col-lg-8 mx-auto" data-aos="fade-up"
     data-aos-duration="1300">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        >

    <div className="swiper-wrapper">
      {SwiperCards.map((card , i)=>
    {
      return (  <div key={i}>


        <SwiperSlide className='swiper-slide'> 
        <div className='col-12'>

<div className="card " style={{borderBottom:'5px solid #ffbe0b'}}>
          <div className="testimonial-item">
            <p>
            <FaQuoteLeft  className='right-icon'/>
            <span className='text-grey' style={{fontSize:'15px'}}>{card.comment}</span>
            {/* <FaQuoteRight className='.left-icon'/> */}
            </p>
            <div className='d-flex justify-content-center'>
              <img src={card.img} alt="" className='testimonial-img' />
            <div>
            </div>

          </div>          
            <h3>{card.name}</h3>
            <h4>{card.client}</h4>
            <div className='stars'>
            <div>
                  {card.icon} {card.icon} {card.icon} {card.icon}{card.icon}
            </div>

            </div>
            </div>
    </div>
        </div>
           </SwiperSlide>


      </div>
          )
    })}
    </div>

<div className="swiper-pagination">
  <div className="swiper-pagination-bullet">

  </div>
</div>
        
      </Swiper>

        

      </div> 
    </div>
  </div>
</div> 


    </>
  )
}
