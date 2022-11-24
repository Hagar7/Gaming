import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Login.module.scss'


export default function Login({saveUserData}) {
  let readMsg = ()=>{
    alert('معلش')
  }
  let[errorMsg,setErrormsg]= useState('');
  let [userValidation,SetUserValidation] = useState({
    email:{
      error: false,
      errorMessage: "email not match"
    },
    password:{
      error: false,
      errorMessage: "password not match ",
    }
  })
  let [user,setUser] =useState({
    email:'',
    password:''
  })
   //Navigate
 let navigate = useNavigate()
 let goToHome = ()=>{
  navigate("/");
 }
  //on change
  let inputInfo = (e)=>{
   let MyUser ={...user}
   MyUser[e.target.name] = e.target.value;
   setUser(MyUser)
  }
  //joi validation
  let validationForm = ()=>{
    let schema = Joi.object({
      email: Joi.string().required().email({tlds:{allow:['com','net']}}),
      password: Joi.string().required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
    })
   return schema.validate(user,{abortEarly:false})
  }
  //on submit
let formData=async (e)=>{
  e.preventDefault()

  let validateResponse = validationForm ()
SetUserValidation({
  email:{
    error: false,
    errorMessage: "email not match"
  },
  password:{
    error: false,
    errorMessage: "password not match ",
  }
})
  if(validateResponse.error){
    validateResponse.error.details.forEach((error)=>{
      SetUserValidation((userValidation) => {
      return {
        ...userValidation,
        [error.path[0]]: { ...userValidation[error.path[0]], error: true },
      };
      });
    });
  }
  else{
    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin',user)
    if(data.message === "success"){
    localStorage.setItem('token',data.token)
    saveUserData()
      goToHome()
     }
     else{
      setErrormsg(data.errors.email.message)
     }
  }
}
  return (
    <>
    <div className="container"> 
    <div className={`${style.log} py-5 px-5`}>
    <div className="row">
      <div className={`${style.item} col-lg-6`}>
      </div>
      <div className= {`${style.itm} col-lg-6 text-center`}>
        <div className={`${style.info} py-5`}>
          <img src="./images/logo.png" alt="" className={`${style.infoImg}`} />
          <h4 className='text-muted my-3'>Log in to GameOver</h4>
          <form onSubmit={formData} >
          <div className={`${style.inputData} my-3 `}>
          <input onChange={inputInfo} type="email" name='email' className='form-control my-3' placeholder='Email' />
          {errorMsg?<div className={`${style.errorMsg} alert p-1 text-start`}>{errorMsg}</div>:""}
          {userValidation.email.error ? (
                      <div className={`${style.errorMsg} alert p-1 text-start`}>
                        {userValidation.email.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
        </div>
        <div className={`${style.inputData} my-3 `}>
          <input onChange={inputInfo} type="password" name='password' className='form-control my-3' placeholder='Password' />
          {userValidation.password.error ? (
                      <div className={`${style.errorMsg} alert p-1 text-start`}>
                        {userValidation.password.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
        </div>
        <div className={`${style.inputData} my-3 `}>
          <button className={`${style.myBtn} btn btn-primary w-100`}>Login</button>
        </div>
          </form>
          <div className={`${style.brdr}`}></div>
          <div onClick={readMsg} className={`${style.spany} py-2`}>Forgot Password?</div>
          <span className={`${style.spany} text-muted`}>Not a member yet? <Link style={{ textDecoration: 'none',color:'#4799eb' }} to="/signup">Create Account</Link></span>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}
