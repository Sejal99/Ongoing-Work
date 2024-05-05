//@ts-ignore
const express= require("express");
const router= express.Router()

//@ts-ignore
let data=[];
//@ts-ignore
router.get('/data',(req,res)=>{
    data.push('apple');
    //@ts-ignore
    res.send(data);
    //@ts-ignore
    console.log(data);
    
})