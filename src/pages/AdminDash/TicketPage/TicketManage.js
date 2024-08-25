import { collection,  getDocs, query, where } from 'firebase/firestore/lite'
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
import MainHeader from '../Components/MainHeader/MainHeader'
import { SlLogin } from 'react-icons/sl'
import { FaPeopleGroup } from "react-icons/fa6";



export default function TicketManage() 

{


  
  const {user , isAuthenticated } = useContext(AuthContext)
  const [ document , setDocument ] = useState([])
  const [loading , setLoading] = useState(false)

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





  return (

    <>
    <MainHeader/>
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
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:'black' }}>
          <TableRow>
            <TableCell className='text-white'>Event Name</TableCell>
            <TableCell  className='text-white' align="right">Total Tickets</TableCell>
            <TableCell className='text-white' align="right">Available Tickets</TableCell>
            <TableCell className='text-white' align="right">Tickets Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {document.map((event , i)=>
            (
                      
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {event.title}
              </TableCell>
              <TableCell align="right">{event.availablePeople}</TableCell>
              <TableCell align="right">{event.people}</TableCell>
              <TableCell align="right">{event.ticket}</TableCell>
      
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>

     }
      </>
      )
}
