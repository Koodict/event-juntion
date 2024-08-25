import React from 'react'
import { useState } from 'react'
import CountUp from 'react-countup'
import  ScrollTrigger  from 'react-scroll-trigger'
import { FaRegHandshake , FaRegThumbsUp  } from "react-icons/fa"
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiTeamLine } from "react-icons/ri";


export default function CounterSection() {
    
  const [counterOn , setCounterOn] = useState(false)

  return (
    <>
    
    
    <div className="service-section3-img mt-5">
  <div className="container">
    <div className="row text-center">

      <div className="col  col-12 col-md-6 col-lg-3 mt-5 text-white">
      <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
        <FaRegHandshake className='icon-service'/>
      <h2>{counterOn && <CountUp start={0} end={125} duration={2} delay={0}/> }+</h2>
        <p>Project Done</p>
      </ScrollTrigger>
          </div>
     <div className="col col-12 col-md-6 col-lg-3 mt-5 d text-white">
      <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
        <HiOutlineEmojiHappy className='icon-service' />
      <h2>{counterOn && <CountUp start={0} end={200} duration={2} delay={0}/> }+</h2>
        <p>Customer Happy</p>
      </ScrollTrigger>
          </div>
          <div className="col  col-12 col-md-6 col-lg-3 mt-5  text-white">
      <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
        <FaRegThumbsUp className='icon-service'/> 
      <h2>{counterOn && <CountUp start={0} end={199} duration={2} delay={0}/> }+</h2>
        <p>Service Guarantee</p>
      </ScrollTrigger>
          </div>
          <div className="col  col-12 col-md-6 col-lg-3 mt-5  text-white">
      <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
      <RiTeamLine className='icon-service'/> 
      <h2>{counterOn && <CountUp start={0} end={99} duration={2} delay={0}/> }+</h2>
        <p>Team Experts</p>
      </ScrollTrigger>
          </div>
    </div>
  </div>
</div> 
    
    </>
  )
}
