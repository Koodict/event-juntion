import React ,{ useRef, useState }  from 'react'
import {IoCallSharp , IoLocationSharp} from 'react-icons/io5'
import {IoMdMail} from 'react-icons/io'
import { TbWorld } from "react-icons/tb";
import emailjs from '@emailjs/browser';

export default function Contact()
 {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message , setMessage] = useState('')
  const [subject , setSubject] = useState('')
  const [process , setProcess] = useState(false)


  const sendEmail = (e) => {

    e.preventDefault();

if(!name || !email || !message || !subject)
{
  window.notify('All Fields are Required','error')
}

const serviceId =  'service_y7fi5ib' 
const templateId = 'template_7u5sgzm'
const publickey = 'b_ZBE4IVjbeo9f63q'

const templateParam = 
{
  from_name:name,
  from_email:email,
  from_subject:subject,
  message:message
}

setProcess(true)

emailjs.send(serviceId, templateId ,templateParam, publickey )

.then(() => {

  window.notify('Send Message Successfully','success')
    
  setName('');
          setEmail('');
          setMessage('')
          setSubject('')
          
          setProcess(false)
        },
        
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };




  return (
    <>
    
    
      <div className=" active About_image">
    <div className='overlay'>      
<div className="container">
  <div className="row">
    <div className="col col-12" >
<div className='main-content-about grid'>

<h2>Contact</h2>
<div className='center-content'>
<a href="#">Home </a>
<p> / Contact</p>
</div>
    </div>
  
</div>
    
  </div>
  
</div>
      </div>
  </div>  

  
  
  <div className="container" style={{ marginTop: '10rem', marginBottom: '10rem'}}>
    <div className="row">
        <div className="col col-12 col-lg-6  order-2 order-md-1" data-aos="zoom-in">
            <div className="card border-0 shadow p-4 p-md-5 rounded-3">

                <h5 className=' mb-5'>Leave a Message</h5>
                  <form  onSubmit={sendEmail}>

                <div className="row">
                    <div className="col col-12 ">
                        <input type="text" className='form-control p-2' placeholder='Your Name'  value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col col-12">
                        <input type="email" className='form-control'  placeholder='Your Email'  value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col col-12">
              <input type="text" className='form-control' placeholder='Your Subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col col-12">
                        <textarea  className='form-control' value={message} placeholder='Your Message' cols="20" rows="10"onChange={(e) => setMessage(e.target.value)}></textarea>
                        <div className='text-center' >
        <button className='btn btn-warning p-2 w-75 mt-5' type='submit'>
  {process ? (
    <div className='spinner-border spinner-border-sm'></div>
  ) : (
    'Send Email'
  )}
</button>
                        </div>
                    </div>
                </div>

                  </form>
            </div>

        </div>

        <div className="col col-lg-6 col-12 text-center contact-right  order-1 order-md-2">

            <p>CONTACT US</p>
<h3>Get In Touch</h3>
<p>Cras porttitor urna eu metus efficitur, a tempus ligula vehicula. Donec ornare pharetra metus nec vehicula. Etiam mauris dolor, interdum id vestibulum et pharetra ac libero. Etiam vestibulum in mi sit amet sed dolor.</p>

<div className="row contact-right-inner">
    <div className="col col-12 col-md-6">
    <IoCallSharp className='contact-icon' />
<h4>Phone</h4>
<p>+923016613599</p>
  </div>

  <div className="col col-12 col-md-6">
    <IoMdMail className='contact-icon' />
<h4>Email</h4>
<p>usamairshad9192@gmail.com</p>
  </div>
  
</div>
<div className="row contact-right-inner mt-4">
    <div className="col col-12 col-md-6">
    <TbWorld className='contact-icon' />
<h4>Website</h4>
<p>event-junction-145.web.app</p>
  </div>

  <div className="col col-12 col-md-6">
    <IoLocationSharp className='contact-icon' />
<h4>Location</h4>
<p>House no 338 Railway Housing Colony Samanabad Faisalabad </p>
  </div>
  
</div>

           
        </div>
    </div>


    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13623.647658633992!2d73.05721720393146!3d31.38899225585999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39225d49afde6e87%3A0x59de94db4a123a7b!2sSamanabad%2C%20Faisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1687360704434!5m2!1sen!2s" width="100%" style={{ border: 'none', marginTop:'5rem' }} height="340" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

</div>

    
          
    
    </>
  )
}
