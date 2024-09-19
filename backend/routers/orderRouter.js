import express from "express"
import { placeOrder,placeOrderStripe,placeOrderRazorpay,allOrder,userOrder,updateOrder, verifyStripe, verifyRazorpay } 
from "../controllers/orderController.js"
import adminAuth from '../middleware/adminAuth.js';
import authUser from "../middleware/auth.js";
const orderRouter=express.Router()
//admin router
orderRouter.post("/list",adminAuth,allOrder)
orderRouter.post("/status",adminAuth,updateOrder)

//payment router
orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/razor",authUser,placeOrderRazorpay)

//user router
orderRouter.post("/userorders",authUser,userOrder)

//verify payment
orderRouter.post("/verifystripe",authUser,verifyStripe)
orderRouter.post("/verifyrazorpay",authUser,verifyRazorpay)

export default orderRouter 