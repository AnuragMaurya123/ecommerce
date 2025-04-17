import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";



// app Config
const app=express();
const port=process.env.PORT || 4000 ;
connectDB()
connectCloudinary()

//midlleware
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
      console.log("Incoming request origin:", origin);
      const allowedOrigins = [process.env.FRONTEND, process.env.ADMIN, process.env.TEST];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));

//api endpoint
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get(('/'),(req,res)=>{
    res.send('Api working')
})

app.listen(port,()=>console.log("server started on port: "+port))