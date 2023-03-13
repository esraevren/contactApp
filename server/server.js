const express = require('express')
const app = express()

app.get('/', function(req,res){
  res.send('contact application')
})

app.listen(8000, ()=>{console.log(`Server is running on port http://localhost:${8000}`)})