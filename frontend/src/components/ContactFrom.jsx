import React, { useState } from 'react'
import Title from './Title';

const ContactFrom = () => {
    const [contact, setContact] = useState({
        username:'',
        email:'',
       message:'',
      })
      const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        //prev is using to get the previous value and define the new value
        setContact((prev)=>({
        ...prev,
        [name]:value
        }))
       
      }
      
      
      const onSubmit=(e)=>{
       e.preventDefault();
      }
  return (
    <div>
        <form onSubmit={onSubmit} className="flex justify-center ">
            <div className="flex justify-center flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
        <Title title={"ASK FOR"} title2={"MORE INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" 
          id='username' name='username' value={contact.username} onChange={handleInput} placeholder='Enter your Full Name'/>
        </div>
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" 
          id='email' name='email' value={contact.email} onChange={handleInput} placeholder='Enter Email Address'/>
        </div>
        <div className="flex gap-3">
        <textarea  id='message' name='message' value={contact.message} onChange={handleInput}   className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Enter Message'></textarea>        
        </div>
        
        <button type='submit' className="bg-black text-white font-light px-8 py-2 mt-4">Submit</button>

       
      </div>
      </form>
    </div>
  )
}

export default ContactFrom
