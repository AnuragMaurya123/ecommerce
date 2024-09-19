import React, { useState } from 'react'

const Subscribe = () => {
  const [subscribe, setSubscribe] = useState({
    
    email:'',
   
  })
  const handleInput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    //prev is using to get the previous value and define the new value
    setSubscribe((prev)=>({
    ...prev,
    [name]:value
    }))
   
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <div className=" text-center"><p className="text-2xl font-medium text-[#e3642a]">Subscribe now &amp; get 20% off</p>
    <p className="text-[#009e3e] mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
    <input className="w-full sm:flex-1 outline-none" type="email"
     placeholder="Enter your email" required  id='email' name='email' value={subscribe.username} onChange={handleInput} />
    <button type="submit" className="bg-[#e3642a] text-white text-xs px-10 py-4">SUBSCRIBE</button>
    </form>
    </div>
  )
}

export default Subscribe
