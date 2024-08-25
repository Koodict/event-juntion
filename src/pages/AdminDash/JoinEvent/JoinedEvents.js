import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore/lite'
import React, { useContext, useEffect, useState }  from 'react'
import { firestore } from '../../../Config/firebase'
import { AuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SlLogin } from 'react-icons/sl'
import { FaPeopleGroup } from 'react-icons/fa6'




export default function JoinedEvent() 

{


  
  const {user , isAuthenticated , search } = useContext(AuthContext)
  const [ document , setDocument ] = useState([])
  const [loading , setLoading] = useState(false)
const [processDelete , setProcessDelete] = useState(false)
const [eventDelete , setEventDelete] = useState(null)


useEffect(()=>
{
  const fetchDocument = async() =>
  {    
    setLoading(true)

    let array = []
    
    const q = query(collection(firestore, "join"), where("createBy.uid", "==", user.uid ));
    
    const querySnapshot = await getDocs(q);
    
querySnapshot.forEach((doc) => {

  let data =doc.data()
  array.push(data)
});

setDocument(array)
setLoading(false)
  }
  
  if (user) {
    fetchDocument();
  }
  
},[user])


const handleDelete = async(event)=>
{
  setEventDelete(event.id)

  event.people = parseInt(event.ticket) + parseInt(event.people);

 setProcessDelete(true)

try
{
await deleteDoc(doc(firestore, "join", event.joiningId));
const docRef1 = doc(firestore, 'Event', event.id);
await setDoc(docRef1, { people: event.people }, { merge: true });

window.notify('Todo has been successfully Deleted' , 'success')

let newDocument = document.filter((doc)=>
{
return event.id !== doc.id
}
)
setDocument(newDocument)
}
catch(error)
{
console.error(error)
}
setProcessDelete(false)
}


  return (

    <>
    {!isAuthenticated

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
        :loading===true
        ? <div className="text-center home backColor"> <div className='spinner-grow spinner-grow-lg spin bg-danger '></div></div>
        :document==0
        ?
        
<>

<div className='bg-warning min-vh-100 grid text-center'>
<div className="container">
  <div className="row">
    <div className="col col-12 ">
    <div>
        <FaPeopleGroup style={{fontSize:'10rem',color:'gray',marginRight:'2rem'}} />
          </div>
      <p className='mb-0 text-center fw-bold fs-1' >Nobody can join your Event</p>
         
</div>
        </div>
      </div>
    </div>
</>

:
    <div className='boxShadow' style={{marginTop:'6rem'}} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead style={{backgroundColor:'black' }}>
          <TableRow>
            <TableCell className='text-white'>Member name</TableCell>
            <TableCell  className='text-white' align="right">Email</TableCell>
            <TableCell className='text-white' align="right">phone:No</TableCell>
            <TableCell className='text-white' align="right">Tickets</TableCell>
            <TableCell className='text-white' align="right">Event Join</TableCell>
            <TableCell className='text-white' align="right">Member id</TableCell>
            <TableCell className='text-white' align="right">Delete Member</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {document.filter((event)=>{
    return search.toLowerCase()===''
    ?event
    :event.title.toLowerCase().includes(search)
  })
.map((event , i)=>
            (
                      
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {event.memberName}
              </TableCell>
              <TableCell align="right">{event.joinedBy.email}</TableCell>
              <TableCell align="right">{event.memberNumber}</TableCell>
              <TableCell align="right">{event.ticket}</TableCell>
              <TableCell align="right">{event.title}</TableCell>
              <TableCell align="right">{event.id}</TableCell>
              <TableCell align="right"> <button className='btn btn-danger btn-sm ' onClick={()=>{handleDelete(event)}} >
                      {event.id===eventDelete && processDelete
                      ?<div className="text-center"> <div className='spinner-border spinner-border-sm'></div> processing</div>
                      :'Delete Member'

                      
                    }</button></TableCell>
            </TableRow>
          ))}
          
            {!document.some((event) => search.toLowerCase() === '' || event.title.toLowerCase().includes(search)) && (
    <div className='min-vh-100 grid'>
      <h1 className='text-center'>No Result Found</h1>
    </div>
  )}
        </TableBody>
      </Table>
    </TableContainer>

    </div>

     }
      </>
      )
}
