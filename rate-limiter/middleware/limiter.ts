const { json } = require('express');
//@ts-ignore
const redis= require('redis')
//@ts-ignore
const client= redis.createClient()

client.connect()
//@ts-ignore
 function limiter( resetTimeInSeconds, rateLimiterCount){
//@ts-ignore
  return async function(req,res,next){

       const ip= (req.connection.remoteAddress).slice(0,9); 
       //console.log(ip);
       const requests=  await client.incr(ip) //It makes the ip of the client as key and value will be the incremented count
       let time
       if(requests == 1){ //It means when exactly the very first request is made,
        await client.expire(ip, resetTimeInSeconds)  //Most imp line.. It tells that our key i.e. our ip address value will reset at every 60 seconds, that means at every 60 seconds the value of our key i.e. ip address will be 0
        time=60 // written just to show the total time the request value will be incremented without being reset
       }else{
         time= await client.time(ip) //The IP address seems to be used as a key in your Redis database, and the ttl command is checking how much time is left before that key expires.   
       }

       if(requests > rateLimiterCount){
        console.log(time);
             return res.status(505),json({
                time
             })
       }
     
        return next()
      }
   
}

module.exports= limiter