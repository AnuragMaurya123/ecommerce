import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const RelatedProduct = ({category,subCategory}) => {
   
    const {products}=useContext(ShopContext)
    const [relatedProduct, setRelatedProduct] = useState([])
    
    useEffect(() => {
      
       if (products.length > 0) {
        let productCopy=products.slice()
        productCopy=productCopy.filter(item=>category.includes(item.category))
        productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory))
        setRelatedProduct(productCopy.slice(0,5))
       }
        
    }, [products]) 
 

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
       {
                        relatedProduct.map((item, index)=>(
                          <ProductItem 
                            key={index} 
                            images={item.images} 
                            price={item.price} 
                            id={item.id} 
                            product_title={item.name} 
                          /> 
                      
                        ))
                      }
    </div>
  )
}

export default RelatedProduct
