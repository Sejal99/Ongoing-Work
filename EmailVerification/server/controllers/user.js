import {User} from "../models/user.js"
import sendUserCreationEmail from "../mail/sendAccountCreationMail.js";

export const create=async(req,res)=>{
    const {name,email}=req.body;
    try {
        const user=await User.create({
            name,email
        });
        //send confirmation email
        sendUserCreationEmail({
            name,email
        })
        res.json(user);
    } catch (error) {
        
    }
}