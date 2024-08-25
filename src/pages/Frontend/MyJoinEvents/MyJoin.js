import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore/lite'
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
import { SlLogin } from "react-icons/sl";
import { MdEventNote } from "react-icons/md";



export default function MyJoin() 

{


  
  const {user , isAuthenticated , search} = useContext(AuthContext)
  const [ document , setDocument ] = useState([])
  const [loading , setLoading] = useState(false)
const [ProcessDelete , setProcessDelete] = useState(false)
const [eventDelete , setEventDelete] = useState(null)


useEffect(()=>
{
  const fetchDocument = async() =>
  {    
    setLoading(true)

    let array = []
    
    const q = query(collection(firestore, "join"), where("joinedBy.uid", "==", user.uid ));
    
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
 setProcessDelete(true)

try
{

await deleteDoc(doc(firestore, "join", event.joiningId));

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
<div className='min-vh-100 grid text-center bg-warning'>
    <div className="container">
      <div className="row">
        <div className="col col-12 mb-5 py-5">
          <div>
        <MdEventNote style={{fontSize:'10rem',color:'gray',marginRight:'2rem'}} />
          </div>
          <div className='mt-5'>

          <p className='mb-0 text-center fw-bold fs-1' >You Cannot Join Any Event</p>
      
          </div>
  
</div>
            </div>
          </div>
        </div>

</>

:
 <>   

<div className='boxShadow' style={{marginTop:'6rem'}} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 0 }} aria-label="simple table">
        <TableHead style={{backgroundColor:'black' }}>
          <TableRow>
            <TableCell className='text-white'>Name</TableCell>
            <TableCell  className='text-white' align="right">Date</TableCell>
            <TableCell className='text-white' align="right">Time</TableCell>
            <TableCell className='text-white' align="right">No of Tickets</TableCell>
            <TableCell className='text-white' align="right">Ticket id</TableCell>
            <TableCell className='text-white' align="right">Event</TableCell>
            <TableCell className='text-white' align="right">Organizer</TableCell>
            <TableCell className='text-white' align="right">Organizer Ph:no</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {document.map((event , i)=>
            (
                      
            <TableRow
              key={i}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {event.memberName}
              </TableCell>
              <TableCell align="right">{event.date}</TableCell>
              <TableCell align="right">{event.startTime} - {event.endTime}</TableCell>
              <TableCell align="right">{event.ticket}</TableCell>
              <TableCell align="right">{event.id}</TableCell>
              <TableCell align="right">{event.title}</TableCell>
              <TableCell align="right">{event.userName}</TableCell>
              <TableCell align="right">{event.callNumber}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
        
        
        </>
      }
      </>
      )
}


