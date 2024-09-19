import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import RelatedProduct from '../components/RelatedProduct'


const Product = () => {
  const { productId } = useParams(); 
  const { products ,currency,addToCart } = useContext(ShopContext); 
  const [productDetail, setProductDetail] = useState(false);
  const [images, setImages] = useState();
  const[size ,setSize]= useState("")
  
  const setDetail = async () => {
    products.map((item)=>{
    if (item._id === productId) {
       setProductDetail(item)
       setImages(item.images[0])   
       return null
    }
  })
  };


  useEffect(() => {
    setDetail();
    
  }, [productId,products]);

  return (
    <div>
      {productDetail ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
         <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {productDetail.images.map((image, index) => (
                  <img
                    key={index}
                    onClick={() => setImages(image)} // Use singular `image`
                    className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                    src={image} // Use singular `image` here
                    alt={`Product thumbnail ${index + 1}`}
                  />
                ))}
              </div>
            <div className="w-full sm:w-[80%]">
              <img className='w-full h-auto' src={images} alt="" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className='font-medium text-2xl mt-2'>{productDetail.name}</h1>
            <div className=" flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
             <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">{currency}{productDetail.price}</p>
            <p className="mt-5 text-gray-500 md:w-4/5">{productDetail.description}</p>
            <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                productDetail.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} value={size}  key={index} className={`border py-2 px-4 bg-gray-100 ${item===size? "border-orange-500": ""}`}>{item}</button>
                ))
              }
            </div>
            </div>
            <button onClick={()=>addToCart(productId,size)} className="bg-[#e3642a] text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
              </div>

          </div>
         </div>
         <div className="mt-20">
          <div className="flex">
            <b className="border px-5 py-3 text-sm">Description</b>
            <p className="border px-5 py-3 text-sm">Reviews (122)</p>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
              <p>An e-commerce website is an online platform that facilitates the buying and 
                selling of products or services over the internet. It serves as a 
                virtual marketplace where businesses and individuals can showcase their 
                products, interact with customers, and conduct transactions without the need 
                for a physical presence. E-commerce websites have gained immense popularity
                 due to their convenience, accessibility, and the global reach they offer.</p>
                 <p>E-commerce websites typically display products or services along with detailed 
                  descriptions, images, prices, and any available variations (e.g., sizes, colors). 
                  Each product usually has its own dedicated page with relevant information.</p>
                  </div>
                  </div>

                  <div className="my-24">
                    <div className=" text-center text-3xl py-2">
                    <Title title={"RELATED"} title2={"PRODUCTS"}/>

                     <RelatedProduct subCategory={productDetail.subCategory}
                      category={productDetail.category}
                     />
                    </div>
                  </div>
        </div>
        
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default Product
