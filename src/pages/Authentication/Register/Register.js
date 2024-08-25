import React, { useContext, useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import {auth , firestore} from '../../../Config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import {BsFillEyeFill , BsFillEyeSlashFill} from 'react-icons/bs'
import Lottie from 'lottie-react'
import animationData from '../../../assests/Animation - 1712647486205.json'

const initialState = {username:'',email:'',password:''}

export default function Register()
{

  const navigate = useNavigate()
  
  const {dispatch } = useContext(AuthContext)
  const [process , setProcess] = useState(false)
  const [state , setState] = useState(initialState) 
  const [showpass , setShowPass] = useState(false)
  
  const handleChange = (e)=>
  {

setState(state=>({...state,[e.target.name]:e.target.value}))

  }

  
  const showPassword = () =>
  {
    setShowPass(true)
    let x = document.getElementById("passId");
    if (x.type === "password") {
      x.type = "text";
    } else {
      setShowPass(false)
      x.type = "password";
    }
  }



  const handleRegister = async(e)=>
  {

    e.preventDefault()
    // console.log(state)

    const {username , email , password} = state

    if(!username)
    {
      window.notify('Please Enter your Username' , 'error')
      return
    }
    if(username.length<3)
    {
      window.notify('Username lenght atleast 3 character' , 'error')
      return
    }
  
    if(!email)
    {
      window.notify('Please Enter your email' , 'error')
      return
    }
    if(!password)
    {
      window.notify('Please Enter your password' , 'error')
      return
    }
    if(password.length<8)
    {
      window.notify('Password lenght AtLeast 8 character' , 'error')
      return
    }

    setProcess(true)

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

      dispatch({type:'LOGOUT'})
      localStorage.removeItem('selectedColor');
     window.notify('Please wait untill the process is complete','success')

    sendEmailVerification(auth.currentUser)
    signOut(auth).then(() =>
    {
      
    }).catch((error) => {
      
      console.error(error)
    });

    let user = userCredential.user;
addDoc(user)

setTimeout(() => {
        
  setProcess(false)
  navigate('/authentication/login')

  window.notify('User Register SuccessFully', 'success')
 }, 2000);
 
 setTimeout(() => {
   window.notify('Email verification sent , verify it ', 'success')
 }, 3000);



  })
  .catch((error) => {
    console.error(error)
    window.notify('You already Register','info' )
    setProcess(false)
    // ..
  });

  }

  const addDoc = async(user) =>
  {
    const {email , password , username} = state

    let formData = {email , password , username}  
  
  formData.dateCreated = serverTimestamp()
  formData.id = window.getRandomId()
  
  
  formData.createdBy = {
    email:user.email,
    uid : user.uid
    
  }

    try
    {
await setDoc(doc(firestore,'User',formData.id),formData)

    }

     
  catch(error)
  {
    window.notify('Something went wrong','error')
  }
  }

  

  
  return (
    <>
    


    <div className='bgReg min-vh-100 d-flex align-items-center ' style={{backgroundColor:'black'}}>
   <div className="container ">
    <div className="row ">
      <div className="col col-6 col-lg-5  d-lg-block d-none  ">
        
 <Lottie animationData={animationData} loop={true} />
      </div>

       <div className="col col-lg-5 mt-4 mt-lg-5 mb-4 col-md-6 offset-md-3  col-sm-8 offset-sm-2 mx-auto col-11">
            <div >
             
              <div className="card border border-warning bg-dark shadow   p-4 rounded-4 text-center">
                <div className='d-lg-none d-block'>

              <Lottie animationData={animationData} loop={true} style={{ height: '100px' }} />
                </div>
                <h2 className='signUpColor' >Create Account</h2>
              <form onSubmit={handleRegister}>
              
           <input  type="text" name="username" placeholder='Username' className='form-control mt-4 rounded-4 p-3 inputColor' onChange={handleChange}/>

            
           <input type="email" name="email" placeholder='Email' className='form-control rounded-4 p-3 mt-4 inputColor ' onChange={handleChange} />
          
            
            <div className="input-group ">
  <input type='password' id="passId" name="password" placeholder="Password"className="form-control mt-4 inputColor rounded-4 p-3"
    onChange={handleChange}  />
<div className="input-group-append">
      {!showpass ? 
      <BsFillEyeFill className="input-icon  fs-4"  onClick={showPassword} />
       : <BsFillEyeSlashFill className="input-icon fs-4"onClick={showPassword} />
      }
    
  </div>
</div>

           
             
                <div className='text-center mt-4'>

         <button className='p-3  btnLogin fw-bold  rounded-4' disabled={process} >{!process
         ?'Register'
         :<div className="spinner-grow spinner-grow-sm" role="status"></div>
        }</button>
        
        </div>
<div className='mt-4'>

                <span className='text-white '>Already have an account ? <Link to='/Authentication/login' className="signUpColor">login</Link> </span>
</div>
              
              
            
              
                          

                
              
              </form>
                </div>
        <div>

          </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      
      

   
    
    </>
  )
}
