import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./AppWrite/auth";
import {login,logout} from "./Store/authSlice"
function App() {
  const [loading ,setLoading]=useState(false);
  const dispatch= useDispatch();

  useEffect(()=>{
    authService.getCurrUser().then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout());
      }
    }).catch(err=>console.log(err)).finally(()=>(setLoading(true)))
  },[])

  return (
    <div>
    
      <h1>Hello World </h1>
    </div>
  )
}

export default App
