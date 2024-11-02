import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from "axios";
import { useEffect } from 'react';
import { toast } from "react-toastify";
const Verify = () => {
    const {navigate,setCartItem,token,BACKEND_URL} =useContext(ShopContext)
    const [searchParams,setSearchParams]= useSearchParams()
    
    const success=searchParams.get("success")
    const orderId=searchParams.get("orderId")
    
    const verifyPayment=async()=>{
        try {
            if (!token) {
                return null;
              }
        
            const response = await axios.post(BACKEND_URL + "/api/order/verifystripe",{ success, orderId },
              { headers: {
                 Authorization: `Bearer ${token}`,
               }});
              if (response.data.success) {
                setCartItem({});
                navigate("/orders");
                toast.success(response.data.message)
              } else {
                navigate("/cart");
                toast.error(response.data.message)
              }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>
      wsduka
    </div>
  )
}

export default Verify
