import express from "express";
import dotenv from "dotenv";
import { mongooseConnect } from './connection/connect.js'
import productRouter from "./routes/product.js";
import cors from 'cors';

dotenv.config();

const app=express();
app.use(express.json());

app.use(cors({
  origin: 'https://deals-cart-giw7.vercel.app'
}));
mongooseConnect();


const PORT=process.env.PORT||5001;

app.use("/products",productRouter);

app.get("/", (req, res)=>{
  res.json('Server is Live');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });