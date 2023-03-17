const express = require("express");
const connectDb=require("./config/dbConnection")
const path = require('path')
require("dotenv").config();
const cors= require('cors')

const errorHandler = require("./middleware/errorHandler");
connectDb()
const app = express();
app.use(cors())

app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use(errorHandler)


app.use('/cdn', express.static(path.join(__dirname, 'cdn')))


app.listen(8000, () => {
  console.log(`Server is running on port http://localhost:${8000}`);
});
