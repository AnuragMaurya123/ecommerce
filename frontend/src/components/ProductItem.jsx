import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({images,id,product_title,price}) => {
  const { currency } = useContext(ShopContext)

 
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img className='hover:scale-110 transition ease-in-out' src={images[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{product_title}</p>
      <p className='pt-3 pb-1 text-sm'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
