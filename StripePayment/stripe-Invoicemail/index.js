const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const nodemailer =require("nodemailer");


const stripe = require("stripe")(
  "sk_test_51PmHJrRwMOzblwjNXVpacPizJrBXeRNn8uP55zrYcooYm5I71O5zaDp497EYZHL8RGOTCcU458CHNjewOJtbS6V700zDYokJQW"
);
const app = express();





app.get("/", (req, res) => {
  res.send("hii");
});

//webhook
let endpointSecret = process.env.SECRET;
let session = "";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    //stripe
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        session = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case "checkout.session.async_payment_succeeded":
        session = event.data.object;
        //send invoice email using nodemailer

        let transporter = nodemailer.createTransport({
          service:'gmail',
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
      
    
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: process.env.EMAIL,
        to: email,
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
        
       

        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
app.listen(5000, () => {
  console.log("server listening on 5000");
});
