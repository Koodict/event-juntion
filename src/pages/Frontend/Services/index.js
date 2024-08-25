import React from 'react'
import ServiceCards from '../Home/ServiceCards'
import CounterSection from './CounterSection'
import ServiceHero from './ServiceHero'
import FaqsSection from './FaqsSection'
import ServiceVideo from './ServiceVideo'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header'
export default function index() {
  return (
    <>
    <Header/>
    <ServiceHero/>
    <ServiceCards/>
    <CounterSection/>
    <FaqsSection/>
    <ServiceVideo/>
    <Footer/>
    </>
  )
}
