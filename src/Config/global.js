import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


 window.getRandomId = ()=>Math.random().toString(36).slice(2)

window.notify = (msg  , type) =>
{

  const option = {
    content: {
      
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "60%"
      
    },
  };

switch(type)
{
        case  'success' :
         toast.success(msg , option)
         
         break
       case  'error' :
         toast.error(msg , option)
        break
       case  'info' :
         toast.info(msg , option)
        break
        case  'warning' :
         toast.warning(msg , option)
         break
         default:
                toast(msg , option)
}


}


