//? seed - /users/seed

//? post - /users (login)

//? Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");

//? Config
const router = express.Router();
const saltRounds = bcrypt.genSaltSync(10);

//? Routes
//? Seed  Routes
router.get("/seed", async (req, res) => {
  try {
    await User.deleteMany({});
    const newUsers = await User.create([
      {
        name: "simon",
        password: bcrypt.hashSync("123", saltRounds),
      },
    ]);
    res.send(newUsers);
  } catch (error) {
    res.send(error);
  }
});

//? hashed password (1 way) - fast
//? maths function -> input -> same output
//? no collision -> diff input -> same output

//? encryption <-> decryption (2 way) - slow

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (user === null) {
    res.send("Login fail");
  } else if (bcrypt.compareSync(password, user.password)) {
    //? create the session (AAA) and set user key & value
    //? also set the cookie (middleware) - AAA
    req.session.user = user;
    // console.log("session", req.session)
    res.send(user);
  } else {
    res.send("Password fail");
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.send("Login fail");
  }
};

//? cookie - AAA -> middleware -> req.session
router.get("/secret", isAuthenticated, async (req, res) => {
  res.send(req.session.user);
});

module.exports = router;
