const redis = require('redis');
const client = redis.createClient();
const express=  require("express")
const app= express()
app.use(express.json())
client.on('connect', function() {
    console.log('Connected!');
  });


  client.on('error', function () {
    console.error('Redis error:');
});


app.listen(3000, ()=> console.log('Listening on port 3000'))