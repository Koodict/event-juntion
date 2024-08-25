import { FaCheckCircle } from "react-icons/fa";
import { RiHotelLine , RiTeamLine } from "react-icons/ri";
import React from 'react'
import { IoFastFoodOutline } from "react-icons/io5";
import { MdEmojiTransportation,MdOutlineCelebration , MdOutlineInsertInvitation  } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { MdVideoSettings } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { TiStarFullOutline } from "react-icons/ti";



  const venueData = [

    {
      name:"Venue & Management",
      detail:"We help you find the perfect venue and manage all the logistics to ensure everything runs smoothly. ",
      icon: <RiHotelLine/>
    },

    {
      name:"Entertainment & Activities",
      detail:"We offer a wide range of entertainment options to keep your guests engaged and entertained. ",
      icon: <RiTeamLine/>
    },

    {
      name:"Catering & Food Services",
      detail:"Our catering team provides delicious and diverse menu options to suit all tastes and dietary needs.",
      icon: <IoFastFoodOutline/>
    },
    {
      name:"Transportation & Logistics",
      detail:"We coordinate transportation and logistics to ensure your guests arrive on time and in comfort.",
      icon: <MdEmojiTransportation />
    },
    {
      name:"Decoration",
      detail:"Our decoration services transform your venue into a stunning setting. We work with you to design and execute a theme that reflects your vision and style.",
      icon: <MdOutlineCelebration />
    },
    {
      name:"Event Design & Decor",
      detail:"Our event design and decor services create a cohesive and beautiful atmosphere. ",
      icon: <MdOutlineInsertInvitation />},
]
      

const EworkData = [
  {
      icon : <BiMessageDetail/>,
      title:'Consultation',
      detail:'Our expert team provides personalized consultations to understand your vision and requirements. We ensure every detail is covered to make your event truly special.',
  },
  {
      icon : <MdVideoSettings/>,
      title:'Planning',
      detail:'We meticulously plan every aspect of your event, from venue selection to catering. Our attention to detail guarantees a seamless experience.',
  },
  {
      icon : <RiUserSettingsLine/>,
      title:'Execution',
      detail:'On the day of your event, our experienced team handles everything with precision and care, allowing you to enjoy the moment without stress.',
  }
]
      


  const pricingData = [

    {
      name:"BASIC TICKET",
      Price:'$120',
      option1 :' 6 Hours',
      option2 :'Decoration',
      option3 :'Photographer',
      option4 :'Catering',
      option5 :'   Entertainment',
      option6 :'Up to 20 Persons',
      icon:  <FaCheckCircle/>
    },
    {
        name:"Standard TICKET",
        Price:'$250',
        option1 :' 8 Hours',
        option2 :'Decoration',
        option3 :'Photographer',
        option4 :'Catering',
        option5 :'   Entertainment',
        option6 :'Up to 50 Persons',
        icon:  <FaCheckCircle/>
      },
  
      {
        name:"GOLD TICKET",
        Price:'$500',
        option1 :' 12 Hours',
        option2 :'Decoration',
        option3 :'Photographer',
        option4 :'Catering',
        option5 :'   Entertainment',
        option6 :'Up to 100 Persons',
        icon:  <FaCheckCircle/>
      },
  
      {
        name:"PLATINUM TICKET",
        Price:'$1250',
        option1 :' 16 Hours',
        option2 :'Decoration',
        option3 :'Photographer',
        option4 :'Catering',
        option5 :'   Entertainment',
        option6 :'Up to 150 Persons',
        icon:  <FaCheckCircle/>
      },
  
  

      ]
      

      const SwiperCards = [
        {
            img:'https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/ahamd.jpg?alt=media&token=78ddec26-5ce2-4e42-bee0-9354fb5608e0',
            name : 'Ahmad Amjad',
            client : 'client',
            comment : 'Our experience with this team was exceptional! They took care of every detail with professionalism and creativity. From start to finish, the process was smooth and stress-free. The event turned out beautifully, exceeding our expectations. Highly recommend their services!',
            icon: <TiStarFullOutline/>
            
        },
        {
            img:'https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/bilal.jpg?alt=media&token=7c0ab973-8625-4024-b235-630cfc57c735',
            name : 'Muhammad Bilal',
            client : 'client',
            comment : 'The team went above and beyond to make our event perfect. Their attention to detail and dedication ensured everything ran smoothly. Highly recommend!',
            icon: <TiStarFullOutline/>
            
        },
        {
            img:'https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/usman.jpg?alt=media&token=cd93d22d-4763-44c6-b94d-1a6c9eb93d2d',
            name : 'Usman Ghani',
            client : 'client',
            comment : 'Absolutely fantastic experience! The staff was professional and creative, making our event unforgettable. Everything was taken care of flawlessly.',
            icon: <TiStarFullOutline/>
            
        },
        {
            img:'https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/faizan.jpg?alt=media&token=3d39bb12-92de-42cc-b64b-9172d2045f21',
            name : 'Faizan Mustafa',
            client : 'client',
            comment : 'We were thrilled with the service provided. The event was a huge success, thanks to their meticulous planning and execution. Would definitely use them again!',
            icon: <TiStarFullOutline/>
            
        },
        {
            img:'https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/bilal%20.jpg?alt=media&token=70d4bf49-2541-4946-a047-34a7646f9c08',
            name : 'Bilal Jutt',
            client : 'client',
            comment : 'The best event planning team we’ve ever worked with! Their expertise and friendly approach made our event stress-free and memorable. Highly recommended!',
            icon: <TiStarFullOutline/>
            
        },
    ]

export {venueData , EworkData , pricingData , SwiperCards}
