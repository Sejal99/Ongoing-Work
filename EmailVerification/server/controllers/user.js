import { User } from "../models/user.js";
import sendUserCreationEmail from "../mail/sendAccountCreationMail.js";

export const create = async (req, res) => {
  const { name, email } = req.body;
  console.log(name,email);
  try {
    const user = await User.create({ name, email });
    await user.save();
    //send confirmation email
    sendUserCreationEmail({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.json(error);
  }
};

// export const sendEmail=async(req,res)=>{
//     try {
//         const users=await User.find();
//         //after finding all users from database i will add them in a queue
//     } catch (error) {
//         console.log(error);
//     }
// }
