import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const {currency,delivery_fee,getCardAmount}=useContext(ShopContext)
  return (
    
      <div className="w-full">
        <div className='text-2xl'>
            <Title title={"CART "} title2={"TOTALS"}/>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {getCardAmount()}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}</p>
                </div>
                <hr />

                <div className="flex justify-between">
                <b>Total</b>
                <b>{currency} {getCardAmount()===0? 0:getCardAmount()+delivery_fee}</b>
                </div>
                
            </div>
      </div>
    </div>
  )
}

export default CartTotal
