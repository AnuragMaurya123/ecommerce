import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const {setShowSearch,countAddToCart,setToken,token,setCartItem,navigate}=useContext(ShopContext)

    const logout=()=>{
        navigate("/user/login")
        localStorage.removeItem("token")
        setToken("")
        setCartItem({})
       
    }
   
    const moblieViewMenu=()=>{
        setVisible(prev => !prev)
    }
    const toggleSearchBar=()=>{
        setShowSearch(true)
    }
  return (
    <div className='flex items-center justify-between  py-5 font-medium'>
        <Link to={"/"}>
      <img src={assets.logo} className='w-32' alt="" />
      </Link>
      <ul className='hidden gap-5  sm:flex text-sm text-gray-700'>
        <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-[#e3642a] hidden' />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-[#e3642a] hidden' />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-[#e3642a] hidden' />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-[#e3642a] hidden' />
        </NavLink>

      </ul>
    <div className="flex items-center gap-6">
      <NavLink to={"/collection"}>
      <img onClick={toggleSearchBar} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
      </NavLink>

     
         <div className="group relative">
         <img onClick={()=>token ? null:navigate("/user/login")} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
         {token ? (
             <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
             <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-sm ">
                 <p onClick={()=>navigate("/userAccount")} className='cursor-pointer hover:text-black'>My Account</p>
                 <p onClick={()=>navigate("/orders")} className='cursor-pointer hover:text-black'>Order</p>
                 <p onClick={logout} className=' cursor-pointer hover:text-black'>Logout</p>
                  </div>
         </div>
         ):null}
        
     </div>
    
       
        <Link to="/cart" className='relative' >
        <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
        <p className='absolute bg-[#e3642a] right-[-5px] rounded-full text-[8px] bottom-[-5px] w-4 text-center leading-4 aspect-square text-white '>{countAddToCart()}</p>
        </Link>
       
        <img onClick={moblieViewMenu} className='sm:hidden w-5 cursor-pointer' src={assets.menu_icon} alt="" />
        {visible ? (
            <div className='absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all w-full'>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={moblieViewMenu} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img  className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={moblieViewMenu} to="/" className='py-2 pl-6 border'>HOME</NavLink>
                    <NavLink onClick={moblieViewMenu} to="/collection" className='py-2 pl-6 border'>COLLECTION</NavLink>
                    <NavLink onClick={moblieViewMenu} to="/about" className='py-2 pl-6 border'>ABOUT</NavLink>
                    <NavLink onClick={moblieViewMenu} to="/contact" className='py-2 pl-6 border'>CONTACT</NavLink>
                   
                    
                </div>
            </div>
        ):null}
       
    </div>
    </div>
  )
}

export default Navbar
