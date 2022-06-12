const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

users.get("/new", async (req, res) => {
  //   res.render("users/new.ejs");
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

users.post("/", async (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await User.create(req.body);
    console.log("created user is: ", createdUser);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = users;
