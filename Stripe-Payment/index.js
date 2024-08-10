import express from 'express'
import dotenv from 'dotenv'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
dotenv.config();

const app=express();

app.set('view engine','ejs');
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.post('/checkout',async(req,res)=>{
    
})


app.listen(5000,()=>console.log('server started on 5000')
)
