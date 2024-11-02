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
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-10">
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-green-500 rounded-full ">
          {success ? <IoCheckmarkDoneCircleSharp  className="text-8xl   text-green" />:<GiCancel   className="text-8xl   text-red" />}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{success ? "Payment Successful":"Payment Unsuccessful"}</h1>
        <p className="text-gray-500 dark:text-gray-400">{success ? "Your payment has been processed successfully.":"Your payment has been processed unsuccessfully."}</p>
      </div>
   
      <div className="mt-6 flex justify-center">
        <Link
          to={"/order"}
          className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-700"
         
        >
          View Order History
        </Link>
        <Link
          to={"/"}
          className="inline-flex items-center justify-center px-4 py-2 ml-4 text-gray-900 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:ring-gray-700"
         
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Verify
