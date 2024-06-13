import user from "../models/user.js";

const handleLogin=async(req,res)=>{
const {email,password}=req.body;
try {
    const User=await user.findOne({email,password}); 
} catch (error) {
    
}


}



export default handleLogin;