
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
  username:String,
  email:String,
    
});

export const User = mongoose.model('user', userSchema);
