
import React  from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import Loader from '../pages/Loader'
import { auth } from '../Config/firebase'

export default function LoaderRoute(props)
{

    const [loaderValue, setLoaderValue]=useState(false)

              

        const {Component} = props

        onAuthStateChanged(auth, (user) => {
            if (user) {

setTimeout(() => {
  setLoaderValue(true)
  
}, 5000);
              

            } else {

setTimeout(() => {
  
  setLoaderValue(true)
  
}, 2000);

            }
          });

        if(!loaderValue)
        
        return <Loader/>


  return (

  <Component />
  )
}