import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite'
import React, { useContext, useEffect, useState } from 'react'
import { firestore } from '../../../Config/firebase'
import { AuthContext } from '../../../context/AuthContext'



export default function UpcomingEvent()
 {

    const {user , document ,setDocument , search } = useContext(AuthContext)
    const [loading , setLoading] = useState(false)
    const [process , setProcess] = useState(false)
    const [joinProcess , setJoinProcess] = useState(null)
  
    useEffect(()=>
    {
      const documents = async()=>
      {
  
    setLoading(true)
  
    let arr = []

    
  
  const q1 = query(collection(firestore, "Event"), where("createBy.uid", "!=", user.uid)  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
  let data =doc.data()
  arr.push(data)
});

const q2 = query(collection(firestore, "Event"), where("createBy.uid", "==", user.uid));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      const data = doc.data();
      arr.push(data)
    });

  
 setDocument(arr)
 
  setLoading(false)
  

  }
  if (user) {
    documents();
  }
      
    },[user])
     
    

    const handleJoined = (event) =>
    {
      setJoinProcess(event.id)
 setProcess(true)
          
      event.dateCreated = serverTimestamp()
event.joiningId = window.getRandomId()
event.joiningStatus = true

event.joinedBy =
{

 email:user.email,
  uid : user.uid,
  
}
createDocument(event)
    }


    const createDocument = async(event) =>
 {
  setProcess(true)

  try
  {

  await setDoc(doc(firestore , 'join', event.joiningId),event );
  
  window.notify('Event has been joined Successfully' , 'success')

}

catch(error)
{
  window.notify('something went wrong' , 'error')
}
setProcess(false)
}


  return (
    <>
    
    {
    
    loading===true

        ? <div className="text-center "> <div className='spinner-grow spinner-grow-lg spin bg-danger '></div></div>

    :
    
    document.length===0
?
<>
<div className='bg-warning min-vh-100  d-flex justify-content-center align-items-center'>
<div className="container">
  <div className="row">
    <div className="col col-12 ">
      
      <p className='mb-0 text-center fw-bold fs-1' >Not Any Upcoming Events</p>
      
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
    ?event.status === 'InActive Event'
    :event.title.toLowerCase().includes(search)
  })
.map((event , i)=>
  
  {
    
    return <div className='col-lg-4 col-sm-6 col-12 mt-5' key={i}>
                <div data-aos="flip-left">

               <div className="card mt-5 mb-5  border-0 bg-light" >

    
      <div className='zoomImg'>

    {event.modifyImageURL ? (
      <img src={event.modifyImageURL} className="img-fluid  rounded-start" alt="..." />
      ) : (
        <img src={event.imageUrl}  className="img-fluid  rounded-start" alt="..." />
        )}
        </div>


<div className="card-body">

        <h5 className="card-title"> <span className='text-warning'> Event : </span>  {event.title}</h5>
  
        <p className="card-text"> <span className='text-warning'>Date : </span>{event.date}  <span className="card-text ms-4"> <span className='text-warning'> Day : </span> {event.day}</span> <span className="card-text ms-4"> <span className='text-warning'>Status :</span> {event.status}</span></p>
        <p className='card-text text-dark rounded-5 p-1' style={{backgroundColor:'#e9ecef'}} >Start Time :{event.startTime}  <span className='card-text ms-3'>End Time :{event.endTime}</span></p>
       


        {!event.joiningStatus ? (
  <button
    className="btn btn-warning w-100 mt-md-1 mt-xl-0 me-2"
    onClick={() => handleJoined(event)}
    disabled={event.status === 'InActive Event'}>
    {process && joinProcess===event.id? (
      <div className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></div>
    ) : (
      'Upcoming Event'
    )}
  </button>
) : (
  <>
    {process && joinProcess===event.id? (
      <div className='d-flex justify-content-center'>

      <div className="spinner-border  spinner-border-sm me-3" role="status" aria-hidden="true"></div>
      </div>
    ) : (
      <>
        <button className="btn btn-success btn-sm mt-md-1 mt-xl-0 btn-sm me-2" disabled>
          Joined
        </button>
    
      </>
    )}
  </>
)}

{!document.some((event) => search.toLowerCase() === '' || event.title.toLowerCase().includes(search)) && (
    <div className='min-vh-100 grid'>
      <h1 className='text-center'>No Result Found</h1>
    </div>
  )}
 
       
      </div>
</div>
</div>
</div>
                
            
                    })}
    



</div>
        </div> 
    </div>
    

        
     

    </>

}
    </>
  )
}

