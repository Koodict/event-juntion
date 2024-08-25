import { sendPasswordResetEmail } from 'firebase/auth'
import React, {  useState }  from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../Config/firebase'
import Lottie from 'lottie-react'
import animationData from '../../../assests/Animation - 1712639784155.json'



const initialState = {email:''}


export default function ForgotPassword()

{

const [state , setState] = useState(initialState)
const [process , setProcess] = useState(false)

const handleChange = (e)=>
{
setState(state =>({...state , [e.target.name]:e.target.value}))
}


const handlePassword = (e)=>
{

e.preventDefault()

 const { email } = state

if (!email)
{
 
  window.notify(' please enter your email', 'info')
  return
  
}


sendPasswordResetEmail(auth , email)

.then(() => 
{
  setProcess(true)

  // Password reset email sent!
  window.notify('password reset email sent','info')
  
  // ..
})
.catch((error) => {
  // const errorCode = error.code;
  // const errorMessage = error.message;
  console.error(error)
  // ..
});
setTimeout(() => {
  setProcess(false)
    
}, 3000);
}


  
  return (
    <>
    


    <div className='min-vh-100 d-flex align-items-center' style={{backgroundColor:'black'}}>
   <div className="container-fluid ">
    <div className="row">
      <div className="col col-6  d-lg-block d-none  ">
      
        <Lottie animationData={animationData} loop={true}  />
      
      </div>

       <div className="col col-md-5 offset-md-3 mx-auto offset-lg-0 col-sm-8 offset-sm-2 col-11 white">
            <div className="  login">
             
              <div className="cord rounded-4 p-4 ">

              <div className='d-lg-none d-block'>

<Lottie animationData={animationData} loop={true} style={{height:'100px'}}   />
  </div>

              <form onSubmit={handlePassword}>
                

              <h2 className='text-center m-5  text-warning'>Forgot Password</h2>
                <div className=" col col-12">
           <input type="email" name="email" placeholder='Email' className='form-control rounded-4 p-3 inputColor'  onChange={handleChange} />

                </div>
              

             
                <div className="col col-12 text-center mt-4 ">
                <button className=' fw-bold  p-3 btnLogin ' disabled={process}>{!process
         ?'Reset Password'
        :<div className="spinner-grow spinner-grow-sm" role="status"></div>
        }</button>
                </div>
                <div className="col col-12 text-center mt-4 ">

                <p className='text-white'>Don't have an account ?  <Link to='/Authentication/register' className="loginColor" style={{textDecoration:'none'}} >Sign In</Link> </p>
             
</div>
                    
              </form>
        
             
                          

                
   
              
            
              </div> 
      
                </div>
              </div> 
            
          </div>
        </div>
      
        </div>

   
    
    </>
  )
}
