import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({})
  const navigate=useNavigate()
  const [products,setProducts]=useState([]);
  const [token, setToken] = useState("")



  const fetchListProduct=async ()=>{
    try {
      const response=await axios.get(BACKEND_URL+"/api/product/list")
      if (response.data.success) {
        setProducts(response.data.products)   
      }else{
        toast.error(response.data.msg)
      }
      
    } catch (error) {
      console.log(error);      
      toast.error(error.message)
    }
  }
  const getUserCart=async (token)=>{
    try { 
    const response=await axios.post(BACKEND_URL+"/api/cart/user-cart",{},{
                    headers: { 
                        Authorization: `Bearer ${token}` // Make sure to format the token correctly
                    }
                })
    if (response.data.success) {
      setCartItem(response.data.cartData)
    }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        console.log(error);      
        toast.error(error.response.data.message)
      }else{
    console.log(error);      
    toast.error(error.message)
  }
    }  


}
  useEffect(() => {
   fetchListProduct()
   
  }, [])
  
  useEffect(() => {
   if (!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"))
    getUserCart(localStorage.getItem("token"))
   }
   }, [token])

   

  const addToCart=async (itemId,sizes)=>{
    const  cartCopy=structuredClone(cartItem)
    if (!sizes) {
      toast.error("Select the sizes of clothes")
      return;
    }
    if (cartCopy[itemId]) {
        if (cartCopy[itemId][sizes]) {
            cartCopy[itemId][sizes] += 1
        } else {
            cartCopy[itemId][sizes] = 1
        }
    } else {
        cartCopy[itemId]={}
        cartCopy[itemId][sizes] = 1
    }
    setCartItem(cartCopy)

    if(token){
      try { 
      const response=await axios.post(BACKEND_URL+"/api/cart/add",{itemId,sizes},{
        headers: { 
            Authorization: `Bearer ${token}` // Make sure to format the token correctly
        }
    })
     if (response.data.success) {
      toast.success(response.data.message)
     }
      
      } catch (error) {
      console.log(error);      
      toast.error(error.message)
      }  
  }
  }

  const deleteToCart=async (itemId,sizes)=>{
    const cartData=structuredClone(cartItem)
    delete cartData[itemId][sizes];
    setCartItem(cartData)
    if(token){
      try {
        const response = await axios.delete(`${BACKEND_URL}/api/cart/delete`, {
          headers: { 
            Authorization: `Bearer ${token}` // Make sure to format the token correctly
        }, // Correctly set headers
          data: { itemId,sizes }  // Data should be passed in the 'data' field
        });
        
        if (response.data.success) {
          toast.success(response.data.message)
         }
          
          } catch (error) {
          console.log(error);      
          toast.error(error.message)
          } 
  }
  }

  const countAddToCart =()=>{
   let totalCount =0
   for(const items in cartItem){
    for(const sizes in cartItem[items]){
      try {
        if (cartItem[items][sizes]>0) {
          totalCount +=cartItem[items][sizes]
        } 
      } catch (error) {
        console.error(error);
        
      }
    }
   }
   return totalCount;
  }

const updateQuatity=async (itemId,sizes,quantity)=>{
  const cartData=structuredClone(cartItem)
  cartData[itemId][sizes]=quantity;
  setCartItem(cartData)
  try {
    if(token){
      try {
      const response=await axios.post(BACKEND_URL+"/api/cart/update",{itemId,sizes,quantity},{
                    headers: { 
                        Authorization: `Bearer ${token}` // Make sure to format the token correctly
                    }
                })
      if (response.data.success) {
        toast.success(response.data.message)
       }
      } catch (error) {
      console.log(error);      
      toast.error(error.message)
      }  
  }
  } catch (error) {
    
  }

}
const getCardAmount=()=>{
  let totalAmount=0;
  for(const items in cartItem){
    let Iteminfo=products.find((product)=>product._id===items)
    for(const item in cartItem[items]){
      try {
        if (cartItem[items][item]>0) {
          totalAmount+=Iteminfo.price*cartItem[items][item]
        }
      } catch (error) {
        console.log(error)
      }
      }
    }
    return totalAmount;
  }

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    BACKEND_URL,
    setSearch,
    setCartItem,
    deleteToCart,
    showSearch,
    setShowSearch,
    addToCart,
    cartItem,
    getUserCart,
    countAddToCart,
    updateQuatity,
    getCardAmount,
    navigate,
    fetchListProduct,
    setToken,
    token,

  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
