const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(
  "sk_test_51PmHJrRwMOzblwjNXVpacPizJrBXeRNn8uP55zrYcooYm5I71O5zaDp497EYZHL8RGOTCcU458CHNjewOJtbS6V700zDYokJQW"
);
const app = express();

const bodyparser = require("body-parser");

app.post(
  "/hooks",
  bodyparser.raw({ type: "application/json" }),
  async (req, res) => {
    let signingsecret = process.env.SIGN_SECRET;
    console.log(signingsecret);

    const payload = req.body;
    const sig = req.headers["stripe-signature"];

    //matching these wenhook is from stripe

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, signingsecret);
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
      return;
    }

    //successfull

    console.log(event.type);
    console.log(event.data.object);
    console.log(event.data.object.id);

    res.json({
      success: true,
    });
  }
);

app.listen(5000, () => {
  console.log("server listening on 5000");
});
