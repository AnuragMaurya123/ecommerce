import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";

//funtion for add product
const addProduct=async (req,res)=>{
    try {
        //getting Product details
        const {name,description,price,category,subCategory,sizes,bestSeller} =req.body;

        //getting images
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]

        // if one of the image undefined than it will not include in images array
        const images=[image1,image2,image3,image4].filter((item)=>item !== undefined)

        // storing image in cloudinary and Retrieving as url array
        let imagesUrl= await Promise.all(
            images.map(async(item)=>{
                let result= await cloudinary.uploader.upload(item.path,{resource_type:"image"})
                return result.secure_url
            })
        )
        const isBestSeller = bestSeller === "true" ? true:false;
        // instance of productModel 
        const productDetail={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestSeller:isBestSeller,
            images:imagesUrl,
            date:Date.now(),
        }
       
        // save product in database
        const Product=new productModel(productDetail)
        await Product.save();

        res.json({ success: true, msg: "Product Added Successfully" });  
    } catch (error) {
        res.json({ success: false, msg:error.message});
    }
}

//funtion for list product
const listProduct=async (req,res)=>{
    try {
        //list product
        const products=await productModel.find({})
        res.json({ success: true, products});
    } catch (error) {

        console.log(error);
        
        res.json({ success: false, msg:error.message});
    }
}

//funtion for remove product
const removeProduct=async (req,res)=>{
    try {
        //remove product
       await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message:"Product Remove"});
    } catch (error) {

        console.log(error);
        
        res.json({ success: false, msg:error.message});
    }
}

//funtion for single product
const singleProduct=async (req,res)=>{
    try {
        //remove product
        const {productId}=req.body;
      const product= await productModel.findById(productId)
        res.json({ success: true, product});
    } catch (error) {

        console.log(error);
        
        res.json({ success: false, msg:error.message});
    }
}

export {addProduct,listProduct,removeProduct,singleProduct}