import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext)
  const [filterModileView, setFilterModileView] = useState(false);
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relavent")
 
 const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=> item !== e.target.value))
    }else{
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=> item !== e.target.value))
    }else{
      setSubCategory(prev=> [...prev,e.target.value])
    }
  }

  const applyFilter=()=>{
    let productCopy=products.slice()
    if(search && showSearch){
      productCopy=productCopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productCopy=productCopy.filter(item=>category.includes(item.category))
    }
    if(subCategory.length>0){
      productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProduct(productCopy)
  }

  const priceFilter=(e)=>{
    let productCopy= filterProduct.slice()
    switch (sortType) {
      case "low-high":
        setFilterProduct(productCopy.sort((a,b)=>(a.price-b.price)))
        break;
        case "high-low":
        setFilterProduct(productCopy.sort((a,b)=>(b.price-a.price)))
        break;
        default:
        applyFilter();
        break;
    }
    
  }

  useEffect(()=>{
   applyFilter();
  },[category,subCategory,search,showSearch,products])
  

  
  useEffect(()=>{
    priceFilter()
   },[sortType])

  const openFilterModileView = () => {
    setFilterModileView((prev) => !prev);
  };

  return (
    <>
    
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
     
      <div className="min-w-60">
      <p
        onClick={openFilterModileView}
        className="my-2 text-xl text-[#009e3e] flex items-center cursor-pointer gap-2"
      >
        FILTERS
        <img className={`h-3 sm:hidden ${filterModileView ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
      </p>

      <div className={`border border-[#009e3e] pl-5 py-3 mt-6 ${filterModileView ? "block" : "hidden"} sm:block`}>
        <p className="mb-3 text-sm text-[#e3642a] font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p  className="flex gap-2 text-black font-medium">
            <input onChange={toggleCategory}  className="w-3" type="checkbox" value="Men" /> Men
          </p>
          <p className="flex gap-2 text-black font-medium">
            <input onChange={toggleCategory} className="w-3" type="checkbox" value="Women" /> Women
          </p>
          <p className="flex gap-2 text-black font-medium">
            <input onChange={toggleCategory} className="w-3" type="checkbox" value="Kids" /> kids
          </p>
        </div>
      </div>

      <div className={`border border-[#009e3e] pl-5 py-3 mt-6 ${filterModileView ? "block mb-6" : "hidden"} sm:block`}>
        <p className="mb-3 text-sm text-[#e3642a] font-medium">TYPE</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2 font-medium">
            <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory} /> Topwear
          </p>
          <p className="flex gap-2 font-medium">
          <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} /> Bottomwear
          </p>
          <p className="flex gap-2 font-medium">
            <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} /> Winterwear
          </p>
        </div>
      </div>
      </div>
      <div className="flex-1">
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
     <Title title="ALL" title2="COLLECTIONS" />
    
    <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-[#009e3e] text-sm px-2">
        <option  value="relavent">Sort by: Relavent</option>
        <option  value="low-high">Sort by: Low to High</option>
        <option value="high-low">Sort by: High to Low</option>
        </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

          {filterProduct.map((item,index)=>(
            <ProductItem key={index} 
            images={item.images}
            id={item._id}
            product_title={item.name}
            price={item.price}
            />
          ))}

        </div>
      </div>
    </div>
    </>
  )
}

export default Collection
