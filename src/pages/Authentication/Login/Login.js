import React, { useContext,useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrFacebookOption } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth} from '../../../Config/firebase';
import { AuthContext } from '../../../context/AuthContext';
import {BsFillEyeFill , BsFillEyeSlashFill} from 'react-icons/bs'
import Lottie from 'lottie-react'
import animationData from '../../../assests/Animation - 1712651802540.json'



const initialState = {email:'' , password:''}


export default function Login()

{

  const navigate = useNavigate()

  const [state , setState] = useState(initialState)
const [process , setProcess] = useState(false)
 const {dispatch } = useContext(AuthContext)
const [showpass , setShowPass] = useState(false)

const showPassword = () =>
{
  setShowPass(true)
  let x = document.getElementById("passIds");
  if (x.type === "password") {
    x.type = "text";
  } else {
    setShowPass(false)
    x.type = "password";
  }
}




const handleChange = (e)=>
{

setState(state=>({...state ,[e.target.name]:e.target.value}))

}




const handleGoogleSignIn = async() =>
{
  try {
    const provider = new GoogleAuthProvider()
    
   await (signInWithPopup(auth , provider))
  } 
  catch (error) 
  {
   
     console.log('error')
    
  }

}

//////////////////////////////////////////


const handleFacebookSignIn = async() =>
{
  try {
    const provider = new FacebookAuthProvider()
    
   await (signInWithPopup(auth , provider))
  } 
  catch (error) 
  {
   
    console.error(error)
    
  }

}
/////////////////////////////////////

const handleLogin = (e) =>
{
  e.preventDefault()

  // console.log(state)
  

  const {email , password} = state

  if(!email)
  {

window.notify('please enter your email','error')
return

  }

  if(!password)
  {
    window.notify('please enter your password','error')
    return
  }

  setProcess(true)

  signInWithEmailAndPassword(auth , email , password)
  
  .then((userCredential) => {

     dispatch({type:'LOGOUT'})
     
    const user = userCredential.user;

    if(user.emailVerified)
    {
       dispatch({type:'LOGIN' , payload:{user} })
      navigate('/')
    window.notify("Login Successfully", "success")
    
setProcess(false)
    }

    else
    {
      signOut(auth).then(() =>
     {
      window.notify("please verify your email", "error")
      
setProcess(false)
    
    }).catch((error) => {
      // An error happened.
      console.error(error)
      
    });
    }

  })

  .catch((error) => {

    if (error.code === 'auth/too-many-requests')
     {
      window.notify('Wrong Password', 'error');

    } else if (error.code === 'auth/invalid-login-credentials')
     {
      window.notify('There is no email record. Please register your email', 'error');
    } else {
      console.error(error);
    }

 console.log(error.code)

setProcess(false)
    return
  })
 
}



  
  return (
    <>
    


    <div className='bgc min-vh-100 d-flex align-items-center' style={{backgroundColor:'black'}}>
   <div className="container-fluid ">
    <div className="row">
      <div className="col col-xl-5  d-lg-block d-none backLogin ">
       
          <Lottie animationData={animationData} loop={true}  />
          </div>

      

       <div className="col col-lg-5 col-xl-5  mt-3 mb-3  col-sm-8 mx-auto col-11 ">
          
              <div className="row">
                <div className="col col-lg-12 col-md-6 offset-2 offset-md-0 mt-lg-5  ">
                 

              <h1 className='d-lg-block d-none loginColor'>Login</h1>
              <p className='d-lg-block d-none text-white'>Don't have an account ?  <Link to='/Authentication/register' className="loginColor" style={{textDecoration:'none'}} >Create your account</Link> </p>
                </div>
              </div>
                

              <div className="cord  rounded-4   p-3 ">
                <div className='d-lg-none d-block'>

              <Lottie animationData={animationData} loop={true} style={{height:'150px'}}   />
                </div>
              <form onSubmit={handleLogin}>
                

              <h1 className='text-center mb-3 d-lg-none d-block loginColor'> Login</h1>
                <div className=" col col-12   ">
           <input type="email" name="email" placeholder='Email' className='form-control rounded-4 p-3  inputColor '  onChange={handleChange} />

                </div>
          
              
                <div className="col col-12 mt-4 input-group">
  <input  type='password' id="passIds" name="password" placeholder="Password"className="form-control  inputColor rounded-4 p-3"
    onChange={handleChange}/>
<div className="input-group-append">
 
      {!showpass ? 
      <BsFillEyeFill className="input-iconLogin  fs-4"  onClick={showPassword} />
       : <BsFillEyeSlashFill className="input-iconLogin fs-4"onClick={showPassword} />
      }
    
  </div>
</div>

                <div className="col col-12  mt-1 d-flex justify-content-end">
                <span ><Link to='/Authentication/forgot' className="loginColor ">Forgot Password ?</Link> </span>
                  </div>
             
                <div className="col col-12 text-center mt-4 ">
          <a href="#">
            <button className='p-3 btnLogin'  disabled={process}>{!process
         ?'Login'
        :<div className="spinner-grow spinner-grow-sm" role="status"></div>
        }</button></a>
                </div>
        
                <div className="col col-12  mt-4">
                <span ><Link to='/Authentication/register' className="loginColor d-lg-none d-block text-center">Create Register Account ?</Link> </span>
                  </div>
                          

                
              </form>
               <div className="row d-flex justify-content-center  offset-lg-1 mt-3">
            
                <div className="col col-3 col-lg-4 col-xl-3  ">
       <a href="#" ><button className=' text-white p-2 p-md-3 btn btn-primary  rounded-5 shadow' >
                <GrFacebookOption className='fs-2 ' onClick={handleFacebookSignIn}/>
                </button></a>
                </div>
                <div className="col col-3 col-lg-4 col-xl-3 ">
                <a href="#" > <button className=' text-white p-2 p-md-3  shadow btn btn-light rounded-5'>
                <FcGoogle className='fs-2 'onClick={handleGoogleSignIn} />
                </button></a>
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
