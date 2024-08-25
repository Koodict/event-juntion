import React from 'react'
import HeroSection from './HeroSection'
import Experiance from './Experiance'
import ServiceCards from './ServiceCards'
import Testimonial from './Testimonial'
import EventWork from './EventWork'
import GetStarted from './GetStarted'
import Pricing from './Pricing'
import Footer from '../Components/Footer'
import Header from '../Components/Header'

export default function index() {
  return (
    <>
    <Header/>
    <HeroSection/>
    <Experiance/>
    <ServiceCards/>
    <GetStarted/>
    <EventWork/>
   <Pricing/>
    <Testimonial/>
   <Footer/>
    
    </>
  )
}
