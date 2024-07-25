import path from 'path'
import ejs from 'ejs'
import transporter from './transporter.js';

const sendUserCreationEmail=async({name,email})=>{
const templatePath=path.join(__dirname, "../views/AccountCreated.ejs");
const data=await ejs.renderFile(templatePath);

const mainOptions={
    from: process.env.EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: data
}
await transporter.sendMail(mainOptions)

}

export default sendUserCreationEmail

