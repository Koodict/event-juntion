import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore/lite';
import React, { useContext, useEffect, useState } from 'react'
import { firestore } from '../../../Config/firebase';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';


const initial ={memberName:'', memberNumber:'', ticket:''}
const joined = false

export default function PublicEvents({events})
 {

   
const {user , isAuthenticated , setEvent ,event , document ,setDocument , search  } = useContext(AuthContext)

const [state , setState] = useState(initial)

const [ joinedDocs , setJoinedDocs ] = useState([])
const [process , setProcess] = useState(false)
const [loading , setLoading] = useState(false)
const [join , setJoin] = useState(joined)
const [joinProcess , setJoinProcess] = useState(null)
    const [selectedPrice , setSelectedPrice] = useState('')
 
    
useEffect(()=>
  {
    const documents = async()=>
    {

  setLoading(true)

  let arr = []

   let joinedArr = []

  const q = query(collection(firestore, "Event"), where("createBy.uid", "!=", user.uid));

  const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {

let data =doc.data()

  arr.push(data)


});

const q1 = query(collection(firestore, "Event"), where("createBy.uid", "==", user.uid));

const querySnapshot1 = await getDocs(q1);

querySnapshot1.forEach((doc) => {

let data =doc.data()

arr.push(data)


});

const joinedQuery = query(collection(firestore, "join"), where("joinedBy.uid", "==", user.uid));

const joinedSnapshot = await getDocs(joinedQuery);

joinedSnapshot.forEach((doc) => {

let data =doc.data()

joinedArr.push(data)
});

    setJoinedDocs(joinedArr)

for(let i = 0; i< joinedArr.length; i++){
  for(let j=0; j< arr.length; j++){

    if(joinedArr[i].id === arr[j].id){
    
      arr[j].joiningStatus = true
   
    }

  }
}

setDocument(arr)
setLoading(false)

console.log(document)

}
if (user) {
  documents();
}
    
  },[user , join])
   

    const handleChange = (event) => {
  
      const { name, value } = event.target;
    
      console.log(value)
        setState(state => ({ ...state, [name]: value }));
        return;
    }
    const handleJoined = async (event) => {

    

      setJoinProcess(event.id);
  
      const { memberName, memberNumber, ticket } = state;
  
      if (!memberName || !memberNumber || !ticket) {
          window.notify('please enter all fields', 'error');
          return;
      }
  
      setProcess(true);
      
       event.ticket = ticket
      event.memberName = memberName;
      event.memberNumber = memberNumber;
      event.dateCreated = serverTimestamp();
      event.joiningId = window.getRandomId();
      event.joiningStatus = true;
      
      if(event.people===0)
        {
            window.notify('No enough tickets', 'error')
            return
        }
    
      event.people -= ticket;
      
      event.joinedBy = {
          email: user.email,
          uid: user.uid,
      };
  
      
          createDocument(event);
  
      setProcess(false);
  };
  
  const createDocument = async (event) => {
      setJoin(false);
      try {
          const docRef = doc(firestore, 'join', event.joiningId);
          await setDoc(docRef, event, { merge: true });

          const docRef1 = doc(firestore, 'Event', event.id);
        await setDoc(docRef1, { people: event.people }, { merge: true });

          window.notify('Event has been joined Successfully', 'success');
      } catch (error) {
          window.notify('something went wrong', 'error');
      }
      setProcess(false);
  };

 


// const getUni = (data , property) =>
//   {
// let newVal = data.map((item)=>{
//   return item[property]
// });
// return newVal = ['All',...new Set(newVal)]

//   }

//   const getUnis = getUni(document , 'price')
  
  return (
    <>
    
    {
         loading==true

        ? <div className="text-center home backColor"> <div className='spinner-grow spinner-grow-lg spin bg-danger '></div></div>

    :
    
    document==0
?
<>
<div className='bg-warning min-vh-100  d-flex justify-content-center align-items-center'>
<div className="container">
  <div className="row">
    <div className="col col-12">
    
      <p className='mb-0 text-center fw-bold fs-1'>Empty Events</p>
      
          
        </div>
          </div>
</div>
        </div>
     
</>
        :
        
        <>   
<div className=" home d-flex justify-content-center align-items-center">

        
    <div className="container mt-5">
      <div className="row">
        
      {document.filter((event)=>{
    return search.toLowerCase()===''
    ?event.status === 'Active Event'
    :event.title.toLowerCase().includes(search)
  })
.map((event , i)=>
  
  (
 <> 
 {/* <div className='mt-5 grid'>

    <FormControl>
    <FormLabel id="demo-row-radio-buttons-group-label">Select the Price</FormLabel>
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group" value={selectedPrice} onChange={handleSelectePrice}>

      <FormControlLabel value="Free" control={<Radio />} label="FREE" />
      <FormControlLabel value="10 to 200" control={<Radio />} label="10 to 200 " />
      <FormControlLabel value="250 to 500" control={<Radio />} label="250 to 500" />
      <FormControlLabel value="more than 500" control={<Radio />} label="more than 500" />
     
    </RadioGroup>
  </FormControl>
                 </div> */}
      
      
  
    <div className='col-lg-4 col-sm-6 col-12 mt-5' key={i}>
                <div data-aos="flip-left">

               <div className="card mt-5 mb-5  border-0  bg-light" >
      <div className='zoomImg'>

    {event.modifyImageURL ? (
      <div className="input-group">

      <img src={event.modifyImageURL} className="img-fluid  rounded-start" style={{aspectRatio:'3/2', objectFit:'cover'}} />
      <div className='input-group-append'>

{event.price=='Free'
? <p className=" eye-card-set3 fw-bold">{event.price}</p>
:
<p className=" eye-card-set3 fw-bold">PKR{event.price}</p>
}

 <p className=" eye-card-set4 fw-bold">{event.people?event.people+' Tickets Available':event.people===0?' Sold Out':''}</p> 


</div>
</div>

) 
: 
      (
        <div className="input-group">
        <img src={event.imageUrl}  className="img-fluid  rounded-start"style={{aspectRatio:'3/2', objectFit:'cover'}}  />


        <div className='input-group-append'>

{event.price=='Free'
? <p className=" eye-card-set3 fw-bold"on>{event.price}</p>
:
<p className=" eye-card-set3 fw-bold">PKR{event.price}</p>
}
 
</div>
<div className='input-group-append'>

<p className="eye-card-set4 fw-bold">{event.people?event.people+' Tickets Available':event.people===0?' Sold Out':''}</p>


</div>
</div>

        )}
        </div>


<div className="card-body">

        <h5 className="card-title"> <span className='text-warning'> Event : </span>  {event.title}</h5>

        <p className="card-text"> <span className='text-warning'>Date : </span>{event.date}  <span className="card-text ms-4"> <span className='text-warning'> Day : </span> {event.day}</span></p>
        <p className='card-text text-dark rounded-5 p-1' style={{backgroundColor:'#e9ecef'}} >Start Time :{event.startTime}  <span className='card-text ms-3'>End Time :{event.endTime}</span></p>
       

<div className='text-center'>
    
    {
      !isAuthenticated
      ? <Link to='/authentication/login'className="btn btn-warning w-100 mb-3 mt-md-1 mt-xl-0 me-2" >join event fast</Link>
      : event.createBy.uid===user.uid 
      ?<button className="btn btn-warning  w-100 mt-md-1  mt-xl-0 me-2"disabled >owner</button>
      :event.price!='Free'
      ?<Link to='/payment'className="btn btn-warning  w-100 mt-md-1 mt-xl-0 me-2" >paid</Link>
      :
           !event.joiningStatus ? 
    <button
      className="btn btn-warning w-100 mt-md-1 mt-xl-0 me-2" disabled={event.people===0} data-bs-toggle="modal" data-bs-target="#exampleUser" onClick={()=>setEvent(event)}
      >
      {process && joinProcess===event.id? 
        <div className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></div>
       : 
        'Join Event'
      }
    </button>
   : (
    <>
      {process && joinProcess===event.id? 
        <div className='d-flex justify-content-center'>
  
        <div className="spinner-border  spinner-border-sm me-3" role="status" aria-hidden="true"></div>
        </div>
       : 
        <>
          <button className="btn btn-success btn-sm w-100  mt-xl-0 btn-sm me-2" disabled>
            Booked
          </button>
  
        </>
      }
    </>
  )
  
  }
<Link to='/previewEvent'className="btn btn-primary btn-sm w-100 mt-md-3 me-2"
 onClick={()=>setEvent(event)}>more detail</Link> 
  </div>  
  



       
      </div>
</div>
</div>
</div>

                  
            
      </>
      ))}
      {!document.some((event) => search.toLowerCase() === '' || event.title.toLowerCase().includes(search)) && (
    <div className='min-vh-100 grid'>
      <h1 className='text-center'>No Result Found</h1>
    </div>
  )}
 



</div>
        </div> 
    </div>
    

        
     

    </>

}

      
{/*  user Modal */}


<div className="modal fade" id="exampleUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Event</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
  <input type="text" className='form-control' placeholder='Name'  name='memberName' onChange={handleChange} />
     
  <input type="tel" className='form-control mt-3' placeholder='Number' name='memberNumber' onChange={handleChange} />


  <select className="form-select  py-3"   name='ticket' aria-label="Default select example" onChange={handleChange}>
       <option style={{ display: 'none'}}>{'Select a Tickets'}</option>
<option value='1'>1 ticket</option>
   <option value='2'>2 ticket</option>
   <option value='3'>3 ticket</option>
   <option value='4'>4 ticket</option>
   <option value='5'>5 ticket</option>
   
</select>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="button" className="btn btn-primary"data-bs-dismiss="modal" onClick={()=>handleJoined(event)}  >
   Register
          
        </button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
