require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Fruit = require("./models/fruits");
const fruitsController = require("./controllers/fruits");
const userController = require("./controllers/users_controller.js");
const sessionsController = require("./controllers/sessions_controller.js");

const session = require("express-session");

const app = express();
const PORT = process.env.PORT | 5001;
const mongodbURI = process.env.MONGODB_URI;

mongoose.connect("mongodb://127.0.0.1:27017/basiccrud");
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
//? middleware
app.use(express.urlencoded({ extended: true }));
app.use("/fruits", fruitsController);
app.use("/users", userController);
app.use("/sessions", sessionsController);
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
