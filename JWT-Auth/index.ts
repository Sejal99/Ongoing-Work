import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoute from './routes/user.js'
dotenv.config();
const app = express();

app.use(express.json());

app.use('/user',userRoute)
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log('Server running on port ' +  port));