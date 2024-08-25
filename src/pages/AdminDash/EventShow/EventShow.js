import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite';
import { firestore, storage } from '../../../Config/firebase';
import {  getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { BsEyeFill} from 'react-icons/bs'
import { MdDeleteOutline, MdEventNote} from 'react-icons/md'
import { RxUpdate } from 'react-icons/rx'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { SlLogin } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

export default function EventShow() 

{

  const steps = ['step1', 'step2', 'step3' , 'step4'];

  const {user , isAuthenticated , event ,setEvent , document , setDocument , activeStep , setActiveStep , search } = useContext(AuthContext)
  const [ joinedDocs , setJoinedDocs ] = useState([])
const [loading , setLoading] = useState(false)
  const [eventDelete , setEventDelete] = useState(null)
  const [processDelete , setProcessDelete] = useState(false)
const [eventUpdate , setEventUpdate] = useState(null)
const [imageFile, setImageFile] = useState(null);
const [SelectDate , setSelectDate] = useState(new  Date())
const [CurrentDate , setCurrentDates] = useState(null)
const [day , setDay] = useState(false)
const [month , setMonth] = useState(false)
const [price , setPrice] = useState('')
const [imageUrl , setImageUrl] = useState()
const [process , setProcess] = useState(false)

const week = ['Sunday' ,  'Monday' , 'Tuesday' , 'wednesday' , 'Thursday' , 'Friday','Saturday']

const months = ['January' ,  'February' , 'March' , 'April' , 'May' , 'June','July','August','September', 'October' , 'November' , 'December']
 



const handleChange = (event) => {
  
  const { name, value } = event.target;
  
  if (name === 'startTime' || name==='category' || name==='status' ||name==='price' || name==='title'  || name==='location'|| name==='endTime' || name==='userName' || name==='callNumber'  || name==='userEmail'|| name==='people') {
    // Don't update the selected day if the start time or end time is changed
    setEvent(s => ({ ...s, [name]: value }));
    return;
  }
  
  
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

  setEvent((s) => ({ ...s, [name]: value, day: selectedDay,month:selectedMonth }));
  
};



const navigate = useNavigate()

useEffect(() => {
  const handlePopState = () => {
      console.log('clicked');
  };

  window.addEventListener('popstate', handlePopState);

  return () => {
      window.removeEventListener('popstate', handlePopState);
  };
}, []);

window.onpopstate = () => {
  navigate("/");
}



  
  useEffect(() => {

    const fetchDocument = async () => {

        setLoading(true)    
  
      let array = []
  
      let joinedArr = []
  
      const q = query(collection(firestore, "Event"), where("createBy.uid", "==", user.uid));
      
      const querySnapshot = await getDocs(q);
      
  querySnapshot.forEach((doc) => {
  
    let data =doc.data()
    
    array.push(data)
    
  
  });
  
  const joinedQuery = query(collection(firestore, "join"), where("createBy.uid", "==", user.uid));
      
  
   const joinedSnapshot = await getDocs(joinedQuery);
      
      joinedSnapshot.forEach((doc) => {
      
      let data =doc.data()
      
      joinedArr.push(data)
      });
  
  setJoinedDocs(joinedArr)
  
  setDocument(array)
  setLoading(false)
  

    }

    setTimeout(() => {
      
      if (user) {
        fetchDocument();
      }
    }, 0);

  }, [user , setDocument]);
  
  


/////////////////////////////////////////

const handleDelete = async(event)=>
  {
  
  setEventDelete(event.id)
  
     let findData = joinedDocs.find((coll)=>{
  return coll.id == event.id
    })
  
  setProcessDelete(true)
  
  try
  {
    if(!findData)
    {
      await deleteDoc(doc(firestore,'Event',event.id));
  
    }
    
    else
   {
    await deleteDoc(doc(firestore,'join',findData.joiningId));
    await deleteDoc(doc(firestore,'Event',event.id));
   }
   
  window.notify('Event has been successfully Deleted' , 'success')
  
  let newDocument = document.filter((doc)=>
  {
    return event.id != doc.id
  })
  
  setDocument(newDocument)
  
  }
  
  catch(error)
  {
    console.error(error)
  }
  setProcessDelete(false)
  }
  

const handleUpdate = async () => {

  setEventUpdate(event.id);

  
  if (SelectDate<=CurrentDate) {
    
    window.notify('Please select a future date', 'error');
    return;
  }
  if(activeStep===3)
    {

      setProcess(true)

      let findData = joinedDocs.find((coll) => {
        return coll.id == event.id;
      });
      
      let formData = { ...event };
      
      formData.modify = serverTimestamp();
      formData.modifiedBy = {
        email: user.email,
        uid: user.uid,
      };
      
      
      try {
        // Check if a new image file is selected
        if (imageFile) {
          const storageRef = ref(storage, `user_images/${imageFile.name}`);
          await uploadBytes(storageRef, imageFile);
          
          // Get the download URL of the uploaded image
          const downloadURL = await getDownloadURL(storageRef);
          
          formData.modifyImageURL = downloadURL;
        }
        
        if (!findData) {
          await setDoc(doc(firestore, 'Event', event.id), formData, { merge: true });
        } else {
          await setDoc(doc(firestore, 'join', findData.joiningId), formData, { merge: true });
          await setDoc(doc(firestore, 'Event', event.id), formData, { merge: true });
        }
        
        let newDocument = document.map((doc) => {
          if (doc.id === event.id) {
            return formData;
          }
          return doc;
        });
        
        setDocument(newDocument);
        
        setProcess(false)
      } 
      catch (error) {
        console.error(error);
        window.notify('Something went wrong, event was not updated', 'error');
        return
      }
      
      window.notify('Event has been successfully updated', 'success');
      
    };
    setActiveStep((prevActiveStep) => prevActiveStep + 1); 
  }
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

const handleBack = () =>
  {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); 
  };


  return (
    <>
      {
      
      !isAuthenticated  
    ?
    <div className='min-vh-100 grid text-center'>
        <div className="container">
          <div className="row">
            <div className="col col-12 mb-5 py-5">
              <div>
            <SlLogin style={{fontSize:'10rem',color:'gray',marginRight:'2rem'}} />
              </div>
              <div className='mt-5'>
    
          <Link to='/authentication/login' className='btnLogin  text-dark' > please Login</Link> 
              </div>
      
    </div>
                </div>
              </div>
            </div>

        : loading==true

        ? <div className="text-center home backColor"> <div className='spinner-grow spinner-grow-lg spin bg-danger '></div></div>
        
        :document==0

        ?
      
<div className='min-vh-100 grid text-center'>
    <div className="container">
      <div className="row">
        <div className="col col-12 mb-5 py-5">
          <div>
        <MdEventNote style={{fontSize:'10rem',color:'gray',marginRight:'2rem'}} />
          </div>
          <div>
    <h2>Event Doesn't Exist if you want to create <br /> event Please click this Button</h2>
    <div className='mt-5'>

      <Link to='/AdminDash/eventPage' className='btnLogin  text-dark'onClick={()=>setActiveStep(0)} > Create Event</Link> 
    </div>
          </div>
  
</div>
            </div>
          </div>
        </div>
    
   
   :

   <div className=" home d-flex  justify-content-center align-items-center mt-5">
     <div className="container">
            <div className="row mt-5 ">
           
            {document.filter((pro)=>{
    return search.toLowerCase()===''
    ?pro
    :pro.title.toLowerCase().includes(search)
  })
.map((pro , i)=>

{ 
return            <div className='col-lg-4 col-sm-6 col-12 mt-5' key={i}>

<div data-aos="flip-left">

 <div className="card bg-light mt-5 mb-5 border-0 "  >

      <div className='zoomImg'>
      {pro.modifyImageURL ? (
            <>
            <div className="input-group">

      <img src={pro.modifyImageURL} className="img-fluid  "style={{aspectRatio:'3/2', objectFit:'cover'}} alt="..." />
      <div className='input-group-append'>

<BsEyeFill className='eye-card-set' data-bs-toggle="modal" data-bs-target="#exampleModalProduct"  onClick={()=>{setEvent(pro)}}/>

 <MdDeleteOutline className='eye-card-set1' data-bs-toggle="modal" data-bs-target="#exampleModal" />
<button style={{background:'none', border:'none', outline:'none'}} onClick={()=>{setActiveStep(0)}}>
<RxUpdate className='eye-card-set2'  data-bs-toggle="modal" data-bs-target="#exampleModalUpdate"  onClick={()=>{setEvent(pro)}}/>
</button>

<div>
{pro.price=='Free'
? <p className=" eye-card-set3 fw-bold">{pro.price}</p>
:
<p className=" eye-card-set3 fw-bold">PKR{pro.price}</p>
}
<p className=" eye-card-set4 fw-bold">{pro.people?pro.people+' Tickets Available':pro.people===0?'Sold Out':''}</p> 

</div>

 
</div>
</div>
            </>
      
      ) : (
        <>
        <div className="input-group">
        <img src={pro.imageUrl}  className="img-fluid " style={{aspectRatio:'3/2', objectFit:'cover'}} alt="..." />
    <div className='input-group-append'>

     <BsEyeFill className='eye-card-set' data-bs-toggle="modal" data-bs-target="#exampleModalProduct"  onClick={()=>{setEvent(pro)}}/>
{!processDelete
?
      <MdDeleteOutline className='eye-card-set1' data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={()=>{setEvent(pro)}}/>
      :
      <div className='spinner-border spinner-border-sm eye-card-set1' ></div>
     

}
<button style={{background:'none', border:'none', outline:'none'}} onClick={()=>{setActiveStep(0)}}>
  <RxUpdate className='eye-card-set2'  data-bs-toggle="modal" data-bs-target="#exampleModalUpdate"  onClick={()=>{setEvent(pro)}}/>
</button>

<div>
  {pro.price=='Free'
  ? <p className=" eye-card-set3 fw-bold">{pro.price}</p>
  :
  <p className=" eye-card-set3 fw-bold">PKR{pro.price}</p>
  }
<div className='input-group-append'>
<p className=" eye-card-set4 fw-bold">{pro.people?pro.people+' Tickets Available':pro.people===0?'Sold Out':''}</p> 
</div>
</div>

      
    </div>
   </div>
        </>
        )}
        
        </div>


        <div className="card-body">

<h5 className="card-title"> <span className='text-warning'> Event : </span>  {pro.title}</h5>
<p className="card-text"> <span className='text-warning'> Location : </span>  {pro.location}</p>
<p className="card-text"> <span className='text-warning'>Date : </span>{pro.date}  <span className="card-text ms-4"> <span className='text-warning'> Day : </span> {pro.day}</span></p>
<p className='card-text text-dark rounded-5 p-1' style={{backgroundColor:'#e9ecef'}} >Start Time :{pro.startTime}  <span className='card-text ms-3'>End Time :{pro.endTime}</span></p>


<p className=" btn-sm mt-md-1 mt-xl-0 me-2 rounded-5 p-1 text-center" style={{backgroundColor:'#fbee0b'}}>{pro.status}</p>

<Link to='/previewEvent'className=" btn btn-sm btn-primary w-100 mt-md-1 mt-xl-0 me-2  p-1 text-center" onClick={()=>setEvent(pro)}>Preview</Link>


</div>

      
 </div>
                    </div>
                  
</div>
                

 })}

  {!document.some((pro) => search.toLowerCase() === '' || pro.title.toLowerCase().includes(search)) && (
    <div className='min-vh-100 grid'>
      <h1 className='text-center'>No Result Found</h1>
    </div>
  )}
 
            </div> 
</div>
        </div> 
 
}

      



{/*  Delete Modal */}


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Event</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Would you like to Delete this Event
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="button" className="btn btn-primary"data-bs-dismiss="modal" onClick={()=>{handleDelete(event)}} >
        Delete
          
        </button>
      </div>
    </div>
  </div>
</div>

     {/* <!-- Button trigger modal --> */}


 <div className="modal fade" id="exampleModalUpdate" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" >Update Event</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
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
      

<input type="text" name='title' value={event.title} className="form-control  p-3 " placeholder="Event Name"  onChange={handleChange} />

        </div>
        <div className="col col-12 col-md-6 mb-3 mb-md-0 p-1  ">
      
        <input type="location" name='location' className="form-control p-3 " placeholder="Location" value={event.location} onChange={handleChange}  />
        </div>
    </div>
    <div className="row mt-3 ">
    <div className="col col-12 col-md-6 mb-3 mb-md-0 ">
    
    <input type="date" name='date' value={event.date} className='form-control p-3' id="date"  onChange={handleChange} />
    
        </div>
        <div className="col col-12 col-md-6 mb-3 mb-md-0 ">
    
  
        <select className="form-select  py-3" disabled  name='day' aria-label="Default select example"   onChange={handleChange}>
        <option style={{ display: 'none'}}>{event.day}</option>
<option>Monday</option>
    <option>Tuesday</option>
    <option>Wednesday</option>
    <option>Thursday</option>
    <option>Friday</option>
    <option>Saturday</option>
    <option>Sunday</option>
</select>
    
        </div>
    </div>
    <div className="row mt-3 ">
       
       <div className="col col-12 col-md-4  p-1 ">
       
       <input type="time" name='startTime' value={event.startTime} step={60} className="form-control p-3"  onChange={handleChange}  />
       </div>
       <div className="col col-12 col-md-4  p-1 ">
       
       <input type="time" name='endTime' value={event.endTime} step={60} className="form-control p-3"  onChange={handleChange}  />
       </div>
       <div className="col col-12 col-md-4  p-1 ">
        
         <select className="form-select  py-3" disabled value={event.month}  name='month' aria-label="Default select example" onChange={handleChange}>
       <option style={{ display: 'none'}}>{event.month}</option>
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
        <select className="form-select  py-3"  name='status'  aria-label="Default select example" onChange={handleChange}>
          <option style={{display:'none'}}>{event.status}</option>
<option value='Active Event'>Active Event</option>
    <option value='InActive Event'>InActive Event</option>

</select>
        </div>
        <div className="col col-12 col-md-4  mb-3 mb-md-0 p-1">
       <input type="number" name='people' placeholder='number of People' className="form-control p-3"  onChange={handleChange}  />
       </div>

        <div className="col col-md-4 col-12 mb-3 mb-md-0 p-1">

 <select className="form-select py-3" name='price'  aria-label="Default select example" onChange={handleChange} onClick={(e)=>setPrice(e.target.value)}>
    <option style={{display:'none'}}>{event.price}</option>
    <option value='Free'>Free</option>
    <option value='Custom' >Custom</option>
</select>
{price === 'Custom' && 
    <input type="number" className="form-control mt-3" value={event.price}  name="price" placeholder="Enter custom price" onChange={handleChange} />
} 
</div>
     
     
    </div>
</div>

    <div className={`mt-5 row ${activeStep === 1 ? 'd-block' : 'd-none'}`}>
      
    <div className="col col-12  mb-3 mb-md-0 p-1" >
    <label>Description</label>
<textarea name="category"  maxLength="1200" placeholder='Description' className='form-control' value={event.category} style={{ overflow: 'auto', maxHeight: '15em' , minHeight:'15em' }} onChange={handleChange}/>
    </div>
  
</div> 

<div className={`mt-5 row ${activeStep === 2 ? 'd-block' :'d-none'}`}>

    <div className="row  ">
        <div className="col col-12  col-md-8 col-lg-6  offset-0 offset-md-3">

<input type="file" name="image"className="form-control p-2 d-none" ref={inputFileRef} accept="image/jpeg, image/png, image/gif"   onChange={handleImageChange} />

<div className="card bg-light p-5 text-center border-0 rounded-3  image_area w-100 "onClick={handleSelectImage} >

{imageUrl
  ?
<img src={imageUrl} alt="Uploaded Image"  />
:
<img src={event.imageUrl} alt="Uploaded Image"  />
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


<input type="text" name='userName' value={event.userName} className="form-control  p-3 " placeholder="Name"  onChange={handleChange} />

        </div>
        <div className="col col-12  mb-3 mb-md-0 p-1  ">
        <label className='text-white'>whatsapp No</label>
        <input type="tel" name='callNumber' value={event.callNumber} className="form-control p-3 " placeholder="Number" onChange={handleChange}  />
        </div>
        <div className="col col-12  mb-3 mb-md-0 p-1  ">
        <label className='text-white'>Your Email</label>
        <input type="email" name='userEmail' value={event.userEmail} className="form-control p-3 " placeholder="Email" onChange={handleChange}  />
        </div>
    </div>
    </div>
</form>
       
      </div>
      <div className="modal-footer">
        
  <div className="row">
  <div className="col col ">
  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

<Button color="inherit"  className={`bg-danger text-white ${activeStep===0&&'d-none'}`} sx={{ mr: 1 }} onClick={handleBack}> Back</Button>

      <Box sx={{ flex: '1 1 auto' }}  />

      <Button className={` bg-danger text-white ${activeStep==0 || activeStep==1 || activeStep==2 || activeStep==3?'d-block ':'d-none'}`} data-bs-dismiss={`${activeStep===3?'modal':''}`} onClick={handleUpdate} disabled={process}  >
      
        {process ? <div className='spinner-border spinner-border-sm' ></div> : activeStep==3 ?'Finish':'Next'}
      </Button>

    </Box>
    
  </div>
</div>
      </div>
  
    </div>
  </div>
</div>

{/*  Modal Card  */}

<div className="modal fade" id="exampleModalProduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title text-center fs-5" id="exampleModalLabel">Preview</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

        <div className="container-fluid">
        <div className="row ">
        <div className=" col col-lg-6  col-sm-10 col-12 offset-sm-1 offset-lg-0">
          <div className="card border-0    ">
         
          {event.modifyImageURL ? (
      <img src={event.modifyImageURL} className="img-fluid   rounded-start" alt="..." />
      ) : (
        <img src={event.imageUrl}  className="img-fluid   rounded-start" alt="..." />
        )}
           
          </div>
    
        </div>
          <div className="col col-lg-6  col-12" >
        
           <h4> Product Name : {event.title}</h4>
           <h4> <span className='fw-bold'>Event Date : </span>{event.date}</h4>
          
           <hr />
           <div>
            </div>

            {event.price=='Free'
  ? <p className=" fw-bold">{event.price} Event</p>
  :
  <p className=" fw-bold">PKR{event.price}</p>
}
<div className='input-group-append'>
<p className="fw-bold">{event.people?event.people+' Tickets Available':event.people===0?'Sold Out':''}</p> 
</div>
<p><span className='fw-bold'>Detail : </span> {event.category}</p>
           </div>
         
            
        </div>
      </div>
        </div>
      </div>
     
    </div>
  </div>



           
    
    </>
  )
}
