require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Fruit = require("./models/fruits");
const fruitsController = require("./controllers/fruits");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/basiccrud");
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
//? middleware
app.use(express.urlencoded({ extended: true }));
app.use("/fruits", fruitsController);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
