const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

app.get("/", (req, res) => {
  res.send("hii");
});

//webhook
let endpointSecret = process.env.SECRET;
let session = "";

app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  async (request, response) => {  // Make the function async
    const sig = request.headers["stripe-signature"];
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
    
        // Handle payment failed event
        break;
      case "checkout.session.completed":
        session = event.data.object;
        let emailSucceeded = session.customer_details.email;
        let product="https://1drv.ms/i/s!AuxExDjwoh_jrqFwCNgrzOMDU7JijQ?e=2Sogud"
        // Create a transporter object using SMTP
        let transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        try {
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: emailSucceeded,
            subject: "Payment Succeeded ✔", // Subject line
            text: "Your payment was successful.", // plain text body
            html: `
            Hello ${session.customer_details.email} Thanks for payment of the product
            Here is the link of product from google drive is ${product}. You can download it.
            
            `, // html body
          });

          console.log("Message sent: %s", info.messageId);
        } catch (error) {
          console.error("Error sending email:", error);
        }

        // Handle payment succeeded event
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
