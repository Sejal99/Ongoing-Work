import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app=express();

app.set('view engine','ejs');
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('index.ejs')
})


app.listen(5000,()=>console.log('server started on 5000')
)
