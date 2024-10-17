import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
const {type} = useParams()
const {navigate,BACKEND_URL,setToken,token}=useContext(ShopContext)

const [user ,setUser]=useState(type === 'login' ? {email:'',password:''}:
  {name:'',email:'',password:''})

const handleInput=(e)=>{
  let name=e.target.name;
  let value=e.target.value;
  //prev is using to get the previous value and define the new value
  setUser((prev)=>({
  ...prev,
  [name]:value
  }))
 
}

const onSubmit = async (e) => {
  e.preventDefault();
  if (type === "signup") {
    try {
      const response =await axios.post(BACKEND_URL+"/api/user/register",user)
      console.log(response);
      
      if (response.data.success) {
        setToken(response.data.token)  
        localStorage.setItem("token",response.data.token)
        toast.success("Resigter Successfully")   
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  } else {
    try {
      e.preventDefault();
      const response =await axios.post(BACKEND_URL+"/api/user/login",user)
      if (response.data.success) {
        setToken(response.data.token) 
        setUser({
          email: "",
          password: "",
        });
        localStorage.setItem("token",response.data.token) 
        toast.success("Login Successfully") 
        
      }else{
        toast.error(response.data.message)
      }
      
  } catch (error) {
      console.log(error);
      toast.error(error.message)
      
  }
  }
 
};

useEffect(()=>{
  if (token) {
    navigate("/")
  }
},[token,user])

const switchFrom=()=>{

  if (type === "login") {
    setUser({
      name: "",
      email: "",
      password: "",
    });
    navigate("user/signup"); 
  } else {
    setUser({
      email: "",
      password: "",
    });
    navigate("user/login"); 
  }  
}

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-[#009e3e] text-3xl">{type=== "login" ? "Log In":"Sign Up"}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          {type === "signup" ?  <input name='name' id='username' type="text" className="w-full px-3 py-2 border border-gray-800" 
           placeholder="Name" required autoComplete='on' value={user.name} onChange={handleInput} />  : ""}
           

          <input id='email' name='email' type="email" className="w-full px-3 py-2 border border-gray-800"
           placeholder="Email" autoComplete='on' value={user.email} onChange={handleInput}/>

          <input id='password' name='password' type="password" className="w-full px-3 py-2 border border-gray-800"
           placeholder="Password" autoComplete='off' value={user.password} onChange={handleInput} />

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className=" cursor-pointer">Forgot your password?</p>
           {type === "login"?  <p onClick={switchFrom} className=" cursor-pointer">Create account ?</p>
           :<p onClick={switchFrom} className=" cursor-pointer">Log in ?</p>}
            </div>

            <button type='submit' className="bg-[#e3642a] text-white font-light px-8 py-2 mt-4">{type=== "login" ? "Log In":"Sign Up"}</button>
            </form>
    </div>
  )
}

export default Login
