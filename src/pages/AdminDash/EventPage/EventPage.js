import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { firestore , storage  } from '../../../Config/firebase'
import {AuthContext} from '../../../context/AuthContext'
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import {BiSolidCloudUpload} from 'react-icons/bi'
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import animationData from '../../../assests/Animation - 1716138047583.json'
import Lottie from 'lottie-react'
import animationData1 from '../../../assests/Animation - 1716140260166.json'


const initialState = {title:'' , location:'', date:'',month:'', startTime:'',endTime:'',category:'' , day:'' , status:'' , price:'', userName:'' , callNumber:'' , userEmail:'',people:'', }
 
 export default function EventPage() 
 {

  let modalToggle ='modal'
 

  const steps = ['Create', 'Detail', 'Image' , 'Finish'];

    const [status , setStatus] = useState(false)
  const [price , setPrice] = useState('')
  const [imageFile, setImageFile] = useState(null);
  const {user , isAuthenticated , activeStep , setActiveStep} = useContext(AuthContext)
const [process , setProcess] = useState(false)
const [state , setState] = useState(initialState)
 const [day , setDay] = useState(false)
 const [imageUrl , setImageUrl] = useState()
 const [month , setMonth] = useState(false)
const [SelectDate , setSelectDate] = useState(null)
const [CurrentDate , setCurrentDates] = useState(null)
const [showModal , setShowModal] = useState(false)

const navigate = useNavigate()


const week = ['Sunday' ,  'Monday' , 'Tuesday' , 'wednesday' , 'Thursday' , 'Friday','Saturday']

const months = ['January' ,  'February' , 'March' , 'April' , 'May' , 'June','July','August','September', 'October' , 'November' , 'December']

const handleChange = (event) => {
  
  const { name, value } = event.target;
  
  if (name === 'startTime' || name==='category' || name==='status' ||name==='price' || name==='title'  || name==='location'|| name==='endTime' || name==='userName' || name==='callNumber'  || name==='userEmail'|| name==='people') {
    // Don't update the selected day if the start time or end time is changed
    setState(state => ({ ...state, [name]: value }));
    return;
  }
  console.log(state)
  
  const date = event.target.value;
  const days = new Date(date).getDay();
  const selectedDay = week[days];
  
  const month = new Date(date).getMonth()
const selectedMonth = months[month]

  const selectedDate = new Date(date);
  const currentDate = new Date();

setSelectDate(selectedDate);
  setCurrentDates(currentDate);

  if (selectedDate <= currentDate) {
    window.notify('Please select a future date', 'error');
    return;
  }
  
setDay(selectedDay);
setMonth(selectedMonth)

  setState((state) => ({ ...state, [name]: value, day: selectedDay,month:selectedMonth }));
  console.log(state)
};


// useEffect(()=>
// {
//   if(animationKey)
//   {
  
//     document.getElementById("btnModalView").click()
//     setAnimationKey(false)
//   }

// },[animationKey]);


/////////////////////////////////////////////////////////////////////


const handleNext = async (e) => {

  
  e.preventDefault();
 
if (!isAuthenticated) {
    navigate('/authentication/login');
    window.notify('Login to your account', 'info');
    return;
  }

  const { title, location, date, startTime , endTime ,price, category, day, status, month , userName , userEmail , callNumber , people} = state;



  if(activeStep==0)
    {

    if (!title) {
      
      window.notify('Please enter your event name', 'error');
      return;
    }
    
    if (SelectDate=='Invalid Date') {
      window.notify('Please select a future date', 'error');
      return;
    }
    
  if (SelectDate<=CurrentDate) {
    window.notify('Please select a future date', 'error');
    return;
  }

  
  if (title.length < 3) {
    window.notify('Event title should be at least 3 characters long', 'info');
    return;
  }
  
  if (!location) {
    window.notify('Please enter your location name', 'error');
    return;
  }

  if (location.length < 3) {
    window.notify('Event location should be at least 3 characters long', 'error');
    return;
  }
  
  if (!date) {
    window.notify('Please enter your date', 'error');
    return;
  }
  
  if (!startTime) {
    window.notify('Please enter your start time', 'error');
    return;
  }
  if (!endTime) {
    window.notify('Please enter your end time', 'error');
    return;
  }

  if (!price) {
  
    window.notify('Please select a price', 'error');
    return;
  }
  
  if (!status) {
    window.notify('Please select a status', 'error');
    return;
  }
  setStatus(status)

  if (!people) {
    window.notify('Please select a status', 'error');
    return;
  }
  

    }


    if(activeStep===1 && !category)
      {
      window.notify('Please enter your category', 'error');
      return;
    }
  
  
    if(activeStep===2 && !imageFile)
      {
    window.notify('Please select an image', 'error');
    return;
} 


if(activeStep===2 && imageFile.size>1000000)
  {
    window.notify('Please select an image within the allowed size of 1mb', 'error');
    return;
  }

if(activeStep==3)
  {
    
    if (!userName || !userEmail || !callNumber) {
      
      window.notify('Please fill the all field', 'error');
      return;
    }

  }  
 
  if (activeStep === 3 ) 
    {
  setProcess(true);

  const storageRef = ref(storage, `user_images/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile);
  const downloadURL = await getDownloadURL(storageRef);

  const formData = {
    title,
    location,
    date,
    price,
    endTime,
    day,
    people,
    month,
    userName,
    userEmail,
    callNumber,
    startTime,
    status,
    category,
    imageUrl: downloadURL,
  };

  formData.dateCreated = serverTimestamp();
  formData.id = window.getRandomId();
formData.availablePeople = people
  formData.createBy = {
    email: user.email,
    uid: user.uid,
  };
  
  createDocument(formData);
  
  setShowModal(true)
}
setActiveStep((prevActiveStep) => prevActiveStep + 1); 
};

useEffect(() => {
  if (showModal) {
    // Show the modal
    document.getElementById("btnModalView").click();
    
    // After 3 seconds (or duration of modal display), navigate to another page
  }
}, [showModal]);


const createDocument = async(formData) =>
  {
    setProcess(true)
    try
    {
      await setDoc(doc(firestore, 'Event', formData.id),formData );
      window.notify('Event has been Successfully Created' , 'success')
    }
catch(error)
{
  window.notify('something went wrong' , 'error')
}

setTimeout(() => {
  setShowModal(false)
  
  navigate('/AdminDash/eventSHow');
}, 0);

setProcess(false)



}


const handleBack = () =>
  {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); 
  };

  const inputFileRef = useRef(null)

  const handleSelectImage = (e) =>
  {
    e.preventDefault()
    inputFileRef.current.click();
  }

const handleImageChange = (e) => {
  
  const image = e.target.files[0];
  const imageUrl = URL.createObjectURL(image);
      setImageUrl(imageUrl);
      setImageFile(image)
      
};



   return (


     <>
     
          <div className="d-flex bg-warning   justify-content-center align-items-center" style={{minHeight:'100vh'}}>

<div className="container mt-5">
        <div className="row mt-5">
        <div className="col col-12  ">
        <div className="card rounded-3 boxShadow m border-0   p-5 " style={{margin:'3rem 0'}}>
        <Box className='stepperSet d-none d-sm-block' >
  <Stepper activeStep={activeStep}>

    {steps.map((label) => 
    {

      const stepProps = {};
      const labelProps = {};

      return (
        <Step key={label} {...stepProps}>
          <StepLabel {...labelProps}>{label}</StepLabel>
        </Step>
      );
    })}
  </Stepper>
</Box>

    <form>
   <div className={` mt-5 ${activeStep === 0 ? 'd-block row' :'d-none'}`}>
   <div className="row mt-3 ">
        <div className="col col-12 col-md-6 mb-3 mb-md-0 p-1 ">

<input type="text" name='title' className="form-control  p-3 " placeholder="Event Name"  onChange={handleChange} />

        </div>
        <div className="col col-12 col-md-6 mb-3 mb-md-0 p-1  ">
    
        <input type="location" name='location' className="form-control p-3 " placeholder="Location" onChange={handleChange}  />
        </div>
    </div>
    <div className="row mt-3 ">
    <div className="col col-12 col-md-6 mb-3 mb-md-0 ">
    <input type="date" name='date' className='form-control p-3' id="date"  onChange={handleChange} />
    
        </div>
        <div className="col col-12 col-md-6 mb-3 mb-md-0 ">
    
  
        <select className="form-select  py-3" disabled  name='day' aria-label="Default select example" onChange={handleChange}>
        <option style={{ display: 'none'}}>{!day?'Select a day':day}</option>
<option value={day}>Monday</option>
    <option value={day}>Tuesday</option>
    <option value={day}>Wednesday</option>
    <option value={day}>Thursday</option>
    <option value={day}>Friday</option>
    <option value={day}>Saturday</option>
    <option value={day}>Sunday</option>
</select>
    
        </div>
    </div>
    <div className="row mt-3 ">
       
       <div className="col col-12 col-md-4 mb-3 mb-md-0  p-1 ">
      
       <input type="time" name='startTime' step={60} className="form-control p-3"  onChange={handleChange}  />
       </div>
       <div className="col col-12 col-md-4 mb-3 mb-md-0 p-1 ">

       <input type="time" name='endTime' step={60} className="form-control p-3"  onChange={handleChange}  />
       </div>
       <div className="col col-12 col-md-4 mb-3 mb-md-0  p-1 ">
        
         <select className="form-select  py-3" disabled  name='month' aria-label="Default select example" onChange={handleChange}>
       <option style={{ display: 'none'}}>{!month?'Select a Month':month}</option>
<option value={month}>January</option>
   <option value={month}>February</option>
   <option value={month}>March</option>
   <option value={month}>April</option>
   <option value={month}>May</option>
   <option value={month}>June</option>
   <option value={month}>July</option>
   <option value={month}>August</option>
   <option value={month}>September</option>
   <option value={month}>October</option>
   <option value={month}>November</option>
   <option value={month}>December</option>
</select>
       </div>
   </div>
   <div className="row mt-3 ">
    <div className="col col-12 col-md-4  mb-3 mb-md-0 p-1">
        <select className="form-select  py-3"  name='status' aria-label="Default select example" onChange={handleChange}>
          <option style={{display:'none'}}>{!status ? 'Select a status' : status}</option>
<option value='Active Event'>Active Event</option>
    <option value='InActive Event'>InActive Event</option>

</select>
        </div>
        <div className="col col-12 col-md-4  mb-3 mb-md-0 p-1">
       <input type="number" min={0} max={300} name='people' placeholder='number of People' className="form-control p-3"  onChange={handleChange}  />
       </div>

        <div className="col col-md-4 col-12 mb-3 mb-md-0 p-1">

 <select className="form-select py-3" name='price' aria-label="Default select example" onChange={handleChange} onClick={(e)=>setPrice(e.target.value)}>
    <option style={{display:'none'}}>{!price ? 'Select a price' : price}</option>
    <option value='Free'>Free</option>
    <option value='Custom' >Custom</option>
</select>
{price === 'Custom' && 
    <input type="number" className="form-control mt-3"  name="price" placeholder="Enter custom price" onChange={handleChange} />
} 
</div>
     
     
    </div>
</div>




    <div className={`mt-5 row ${activeStep === 1 ? 'd-block' : 'd-none'}`}>
      
    <div className="col col-12  mb-3 mb-md-0 p-1" >
    <label>Description</label>
<textarea name="category"  maxLength="1200" placeholder='Description' className='form-control' style={{ overflow: 'auto', maxHeight: '15em' , minHeight:'15em' }} onChange={handleChange}/>
    </div>
  
</div> 

<div className={`mt-5 row ${activeStep === 2 ? 'd-block' :'d-none'}`}>

    <div className="row  ">
        <div className="col col-12  col-md-8 col-lg-6  offset-0 offset-md-3">

<input type="file" name="image"className="form-control p-2 d-none" ref={inputFileRef} accept="image/jpeg, image/png, image/gif" onChange={handleImageChange} />

<div className="card bg-light p-5 text-center border-0 rounded-3  image_area  "onClick={handleSelectImage} >

{!imageUrl
?
<>
<div><BiSolidCloudUpload className='iconUpload' /></div>
<h3 className='fontSize'>Main Upload Image</h3>
<p>image size must be less than 2mb</p> 
</>
:
<img src={imageUrl} alt="Uploaded Image"  />
}
</div>


</div>
</div>       
</div>

<div className={` mt-5 ${activeStep === 3 ? 'd-block row' :'d-none'}`}>
   <div className="row mt-3 text-center">
    <h2>Personal Information</h2>
        <div className="col col-12  mb-3 mb-md-0 p-1 ">
        <label className='text-white'>Your Name</label>


<input type="text" name='userName' className="form-control  p-3 " placeholder="Name"  onChange={handleChange} />

        </div>
        <div className="col col-12  mb-3 mb-md-0 p-1  ">
        <label className='text-white'>whatsapp No</label>
        <input type="tel" name='callNumber' className="form-control p-3 " placeholder="Number" onChange={handleChange}  />
        </div>
        <div className="col col-12  mb-3 mb-md-0 p-1  ">
        <label className='text-white'>Your Email</label>
        <input type="email" name='userEmail' className="form-control p-3 " placeholder="Email" onChange={handleChange}  />
        </div>
    </div>
    </div>


  <div className="row">
  <div className="col col ">
  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

<Button color="inherit"  className={`bg-danger text-white ${activeStep===0&&'d-none'}`} sx={{ mr: 1 }} onClick={handleBack}> Back</Button>

      <Box sx={{ flex: '1 1 auto' }} />

      <Button className={` bg-danger text-white ${activeStep==0 || activeStep==1 || activeStep==2 || activeStep==3?'d-block':'d-none'}`} onClick={handleNext} disabled={process}  >

        {process ? <div className='spinner-border spinner-border-sm' ></div> : activeStep==3 ?'Finish':'Next'}
      </Button>

    </Box>
    
  </div>
</div>
</form>
  
    </div> 
</div> 
</div>
</div>
</div>



   
   
      {/* Event Create Modal */}
      <button
        id="btnModalView"
        className="btn d-none"
        data-bs-toggle={modalToggle}
        data-bs-target="#playModal"
      >
        Modal Activate
      </button>

      <div className="modal fade" id="playModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <div
                className="d-flex justify-content-center position-absolute"
                style={{ top: '-60px' }}
              >
                <Lottie
                  animationData={animationData1}
                  loop={true}
                
                  className="w-100"
                />
              </div>
            </div>
            <div className="modal-body py-5">
              <h3 className="mb-0 text-center text-white family">
                Congratulations! Event has been successfully created.
              </h3>
              <div className="d-flex justify-content-center">
                <Lottie
              
                  animationData={animationData}
                  loop={true}
                  
                  className="w-25"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    
     </>
   )
 }
 
 
 
 
 



  









      