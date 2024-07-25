import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //checking connection
  transporter.verify((error,succes)=>{
    if(error){
        console.log(error);
    }else{
        console.log('mail server is running');
    }
  })

  export default transporter;