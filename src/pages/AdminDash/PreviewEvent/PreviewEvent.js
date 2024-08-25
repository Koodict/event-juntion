import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite';
import React, { useContext, useEffect, useState } from 'react'
import { firestore } from '../../../Config/firebase';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';



const joined = false


export default function PreviewEvent() {

const {user , event , document , setDocument , isAuthenticated , setEvent } = useContext(AuthContext)

const [ docu , setDocu ] = useState([])
const [ joinedDocs , setJoinedDocs ] = useState([])
const [process , setProcess] = useState(false)
const [deleteProcess , setdeleteProcess] = useState(false)
const [join , setJoin] = useState(joined)
const [joinProcess , setJoinProcess] = useState(null)

useEffect(() => {

    const fetchDocument = async () => {
  
      let array = []

      let arr = []

      let joinedArr = []

  const q1 = query(collection(firestore, "Event"),where("createBy.uid", "!=", user.uid));
      const querySnapshot = await getDocs(q1);
      querySnapshot.forEach((doc) => {
  let data =doc.data()
    array.push(data)
    });


    const q2 = query(collection(firestore, "Event"), where("createBy.uid", "==", user.uid));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          const data = doc.data();
          array.push(data);
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
        setDocu(arr)
  
  
    }

    if (user) {
      fetchDocument();
    }

  }, [user , join]);

  

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
       setJoin(false)
     
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
   
        <div className=" d-flex justify-content-center align-items-center">
      <div className="container-fluid">
    
        {document.filter((pro) => pro.id === event.id)
      .map((pro , i) => (
        <>
      
          <div className="row  mt-5">
            <div className=" col-12 mt-5 bg-light p-5 rounded-5" key={i}>
              <div className="card  border-0  rounded-5  mt-5 ">
             
              {pro.modifyImageURL ? (
                  <img src={pro.modifyImageURL} className="img-fluid   rounded-5" alt="..." />
                ) : (
                    <img src={pro.imageUrl}  className="img-fluid   rounded-5" style={{aspectRatio:'3/2' , objectFit:'cover' ,  }} />
                )}
               
                </div>
              </div>
            
            </div>

            <div className="row d-flex"style={{margin:'7rem 2rem 0 2rem'}}>
              <div className="col col-12 col-md-8" >
                 

                  <span style={{fontSize:'1rem', color:'#1E0A3C'}}>{pro.day} , {pro.month} </span>
               <h1 style={{fontSize:'3.2rem', color:'#1E0A3C'}}>{pro.title}</h1>
              

            </div>
              <div className="col col-12 col-md-4 ">
                <div className="card p-4 rounded-3 text-center">
                {event.price=='Free'
? <h2 className=" fw-bold">{event.price}</h2>
:
<h2 className="fw-bold">PKR{event.price}</h2>
}

  <div className='text-center'>
    
  {
    !isAuthenticated
    ? <Link to='/authentication/login'className="btn btn-warning w-100 mt-md-1 mt-xl-0 me-2" >Hurry up! join the Event</Link>
    : event.createBy.uid===user.uid 
    ?<button className="btn btn-warning  w-100 mt-md-1 mt-xl-0 me-2"disabled >owner</button>
    :event.price!='Free'
    ?<Link to='/payment'className="btn btn-warning  w-100 mt-md-1 mt-xl-0 me-2" >paid</Link>
    :
         !event.joiningStatus ? 
  <button
    className="btn btn-warning w-100 mt-md-1 mt-xl-0 me-2 " 
    onClick={() => handleJoined(event)}
    disabled>
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
        <button className="btn btn-success btn-sm mt-md-1 mt-xl-0 btn-sm me-2" disabled>
          Joined
        </button>

      </>
    }
  </>
)

}
</div>  

                </div>
             </div>
             
                
            </div>
    
          <div className="row"style={{margin:'1rem 2rem'}}>
            <div className="col">
               
    <p style={{fontSize:'1.1rem'}} className='text-gray fw-bold'>Date and time : </p>
    <span style={{fontSize:'1.3rem', color:'gray'}}>{pro.day} - {pro.month} - {pro.date}</span>
            </div>
          </div>
          <div className="row"style={{margin:'1rem 2rem'}}>
            <div className="col">
               
    <p style={{fontSize:'1.1rem'}} className='text-gray fw-bold'>Location : </p>
    <span style={{fontSize:'1.3rem',color:'gray'}}>{pro.location}</span>
            </div>
          </div>

          <div className="row"style={{margin:'1rem 2rem'}}>
            <div className="col">
               
    <p style={{fontSize:'1.1rem'}} className='text-gray fw-bold'>Refund Policy</p>
    <span style={{fontSize:'1rem'}}>Contact the organiser to request <p>
    a refund Event Junction fee is nonrefundable. </p> </span>
            </div>
          </div>
    
          <div className="row"style={{margin:'1rem 2rem'}}>
            <div className="col col-12 col-md-6">
               
    <p style={{fontSize:'1.1rem'}} className='text-gray fw-bold'>About this event</p>
    <span style={{fontSize:'0.8rem' ,color:'gray'}}>{pro.category} </span>
            </div>
          </div>

          <div className="row"style={{margin:'1rem 2rem'}}>
            <div className="col col-12 col-md-6">
               
    <p style={{fontSize:'1.1rem'}} className='text-gray fw-bold'>Organised By {pro.userName}</p>
    <p style={{fontSize:'1.1rem'}} className='text-gray fw-bold'>Whatsapp : {pro.callNumber}</p>
    <a href={`mainto:${pro.userEmail}`} style={{fontSize:'1.1rem'}} className='text-gray fw-bold'>{pro.userEmail}</a>
   
            </div>
          </div>
        </>
          ))}
        </div>
    
            </div>
      
          
          </>

  )
}
