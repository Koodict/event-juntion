
import { onAuthStateChanged } from 'firebase/auth'
import React ,{ createContext, useEffect, useReducer, useState} from 'react'
import { auth } from '../Config/firebase'


// Inside your component

export const AuthContext = createContext()

const initialState = {isAuthenticated : false , user :{uid:''} }

const reducer = ((state , action)=>
{
  
  

switch (action.type) {
        case 'LOGIN':
          
        return {isAuthenticated : true , user: action.payload.user }        
         
        case 'LOGOUT':
          
          return {isAuthenticated:false}
        
          default:
            return state                
          }
})

export default function AuthContextProvider(props)

{
  
  const [state , dispatch] = useReducer(reducer , initialState)

  
  const [event , setEvent] = useState({}) 
  const [document , setDocument] = useState([])


  const [search, setSearch] = useState('');




const [activeStep, setActiveStep] = useState(parseInt(localStorage.getItem('activeStep')) || 0)


useEffect(() => {
  localStorage.setItem('activeStep', activeStep );
}, [activeStep]);


  useEffect(()=>
  {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
      
        console.log(user)
      dispatch({type:'LOGIN' , payload : {user}})
        // ...
      } else {
        
         
        // ...
      }
    });
  },[])

  
  
return (
  
  <AuthContext.Provider value={{...state , dispatch ,event ,setEvent , activeStep , setActiveStep , document ,setDocument , search , setSearch }}>
        {props.children}
</AuthContext.Provider>
  )
  
}


