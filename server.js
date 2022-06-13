require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const Fruit = require("./models/fruits");
const fruitsController = require("./controllers/fruits");
const userController = require("./controllers/users_controller.js");
const sessionsController = require("./controllers/sessions_controller.js");

const app = express();
const PORT = process.env.PORT | 5001;
const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost:27017";

mongoose.connect(mongodbURI);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
//? middleware
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/fruits", fruitsController);
app.use("/users", userController);
app.use("/sessions", sessionsController);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
