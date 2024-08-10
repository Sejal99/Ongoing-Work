import express from "express";
import dotenv from "dotenv";
import { mongooseConnect } from './connection/connect.js'
import userRoutes from "./routes/user.js"
import cors from 'cors';

dotenv.config();

const app=express();
app.use(express.json());

app.use(cors());
mongooseConnect();


const PORT=process.env.PORT||5001;

app.use("/users",userRoutes);

app.get("/", (req, res)=>{
  res.json('Server is Live');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });