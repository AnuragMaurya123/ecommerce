import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const {products,currency, cartItem,updateQuatity,navigate}=useContext(ShopContext)
  const [cartDetails, setCartDetails] = useState([])


  useEffect(() => {

    if (products.length>0) {
      let cartTamp=[]
   for(const items in cartItem){
    for(const item in cartItem[items]){
      if (cartItem[items][item]>0) {
        cartTamp.push({
          _id:items,
          size:item,
          quantity: cartItem[items][item]

        })

      }
    }
   }
   setCartDetails(cartTamp);
    }
   
   
  }, [cartItem,products])

  
  return (<>
    <div className="border-t pt-14">
    <div className=' text-2xl mb-3'>
      <Title title={"YOUR"} title2={"CART"}/>
      <div className="">
       {cartDetails.map((cartProduct,index)=>{
       const productData=products.find((product)=>product._id===cartProduct._id);
              return(
                <div key={index} className=' text-sm py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className=" flex items-start gap-6">
                    <img className='w-16 sm:w-20' src={productData.images[0]} alt="" />
                    <div className="">
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {cartProduct.size}
                      </p>
                      </div>
                  </div>
                  </div>
                  
                  <input onChange={(e)=>e.target.value==="" || e.target.value==="0"? null:updateQuatity(cartProduct._id,cartProduct.size,Number(e.target.value))} 
                   className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={cartProduct.quantity}  />
                  <img onClick={()=>updateQuatity(cartProduct._id,cartProduct.size,0)} className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt=""/>
                </div>
              )   
       })}
      </div>
      
    </div>
    <div className="flex justify-end my-20">
    <div className="w-full sm:w-[450px]">
      <CartTotal/>
      <div className=" w-full text-end">
        <button onClick={()=>navigate("place-order")}  className="bg-[#e3642a] text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Cart
