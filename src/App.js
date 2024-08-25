import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { ToastContainer } from 'react-toastify';

import AuthContextProvider from './context/AuthContext';
import  Routes from './pages/Routes' ;



function App() {
  return (
    <>

<AuthContextProvider>


      <Routes/>
      
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

</AuthContextProvider>

      </>
    
  );
}

export default App;
