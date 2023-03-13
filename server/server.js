require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("contact application");
});

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => console.log(error));

app.listen(8000, () => {
  console.log(`Server is running on port http://localhost:${8000}`);
});
