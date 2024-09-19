import React from 'react'
import Subscribe from '../components/Subscribe'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import ContactFrom from '../components/ContactFrom'

const Contact = () => {
  
  return (
    <div>
      <div><div className="text-2xl text-center pt-8 border-t">
       <Title title={"CONTACT"} title2={"US"}/>
          </div>
          
          <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
            <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />
            <div className="flex flex-col justify-center items-start gap-6">
              <p className="font-semibold text-xl text-[#009e3e]">Our Store</p>
              <p className=" text-black">54709 Willms Station <br/> Suite 350, 
              Washington, USA</p>
              <p className=" text-black">Tel: (415) 555-0132 <br/> Email: admin@forever.com</p>
              <p className="font-semibold text-xl text-[#009e3e]">Careers at Forever</p>
              <p className=" text-black">Learn more about our teams and job openings.</p>
              <button className="border border-[#009e3e] px-8 py-4 text-sm hover:bg-[#e3642a]
               hover:text-white transition-all duration-500">Explore Jobs</button>
               </div>
               </div>   
                     
            <Subscribe/>
            
            </div>
          
    </div>
  )
}

export default Contact
