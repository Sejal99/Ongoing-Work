import {User} from "../models/user.js"

export const create=async(req,res)=>{
    const {name,email}=req.body;
    try {
        const user=await User.create({
            name,email
        })
        res.json(user);
    } catch (error) {
        
    }
}