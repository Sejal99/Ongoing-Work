//@ts-ignore
const express=  require("express")

const redis = require('redis');
const client = redis.createClient();

const app= express()
const userRoutes=require('./routes/userRoutes')
app.use(express.json())
client.on('connect', function() {
    console.log('Connected!');
  });


  client.on('error', function () {
    console.error('Redis error:');
});


app.use('/',userRoutes)

app.listen(3000, ()=> console.log('Listening on port 3000'))