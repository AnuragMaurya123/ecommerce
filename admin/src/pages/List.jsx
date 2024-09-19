import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../App'
import { toast } from 'react-toastify'
const currency="$ ";

const List = ({token}) => {
  const [list, setList] = useState([])

  const fetchListProduct=async ()=>{
    try {
      const response=await axios.get(BACKEND_URL+"/api/product/list")
      if (response.data.success) {
        setList(response.data.products)       
      }else{
        toast.error(response.data.msg)
      }
      
    } catch (error) {
      console.log(error);      
      toast.error(error.message)
    }
  }
  const fetchDeleteProduct =async(id)=>{
    try {
      const response=await axios.post(BACKEND_URL+"/api/product/remove",{id},{headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message)    
        await fetchListProduct() ;
      }else{
        toast.error(response.data.message)    
      }
      
    } catch (error) {
      console.log(error);      
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchListProduct()    
  },[])

  return (
    <>
    <p className="mb-2 font-bold">All Products List</p>
    <div className="flex flex-col gap-2">
    <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border
     bg-[#009e3e9e] text-sm">
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className="text-center">Action</b>
      </div>
      {list.map((product)=>(
     <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] 
     items-center gap-2 py-1 px-2 border text-sm' key={product._id}>
      <img className='w-12' src={product.images[0]} alt="" />
      <p>{product.name}</p>
      <p>{product.category}</p>
      <p>{currency}{product.price}</p>
      <p onClick={()=>fetchDeleteProduct(product._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
     </div>
     ))} 
    </div>
    
    </>
  )
}

export default List
