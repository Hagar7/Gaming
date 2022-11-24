import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export let AuthenContext = createContext(null);

export default function AuthenContextProvider (props) {


  let [userData,setUserData]= useState(null);
  let saveUserData = ()=>{
    let encodedData = localStorage.getItem('token')
    let decodedData = jwtDecode(encodedData)
    setUserData(decodedData)
  }
  let logout = ()=>{
    localStorage.removeItem('token')
    setUserData(null);
    <Navigate to="/login"/>
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      saveUserData()
    }
  }, [])
  


    return <AuthenContext.Provider value={{userData,saveUserData,logout}}>
        {props.children}
    </AuthenContext.Provider>

}