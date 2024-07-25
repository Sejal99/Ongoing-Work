import path from 'path';
import ejs from 'ejs';
import transporter from './transporter.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendUserCreationEmail = async ({ name, email }) => {
    const templatePath = path.join(__dirname, "../views/AccountCreated.ejs");
    const data = await ejs.renderFile(templatePath, { name });

    const mainOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: data
    };

    await transporter.sendMail(mainOptions);
};

export default sendUserCreationEmail;
