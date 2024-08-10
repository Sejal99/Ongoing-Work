import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const app=express();

app.set('view engine','ejs');
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.post('/checkout',async(req,res)=>{
    const session=await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:'Node.js and Express book'
                    },
                    unit_amount:50*100
                },
                quantity:1
            }
        ],

        mode:"payment",
        success_url:"http://localhost:5000/complete",
        cancel_url:"http://localhost:5000/cancel"
    })
    res.redirect(session.url)
    
})

app.get('/complete',(req,res)=>{
    res.send('Your payment was successful')
})

app.listen(5000,()=>console.log('server started on 5000')
)
