const express = require("express")

const dotenv =require("dotenv");
dotenv.config();
const stripe=require("stripe")("sk_test_51PmHJrRwMOzblwjNXVpacPizJrBXeRNn8uP55zrYcooYm5I71O5zaDp497EYZHL8RGOTCcU458CHNjewOJtbS6V700zDYokJQW")
const app = express();

const bodyparser=require("body-parser")


app.post('/hooks',bodyparser.raw({type:'application/json'}),async(req,res)=>{
    let signingsecret=process.env.SIGN_SECRET;
    console.log(signingsecret);
    
})



app.listen(5000,()=>{
    console.log('server listening on 5000');
    
})