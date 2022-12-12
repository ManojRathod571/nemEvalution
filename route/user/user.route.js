const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../../model/users/user.model");
module.exports = userRoute = express.Router();

// to check all users
userRoute.get("/", async (req, res) => {
  try {
    let user = await userModel.find();
    res.send(user);
  } catch (error) {}
});

//  to sign up
userRoute.post("/signup", async (req, res) => {
  const { name, age, email, password } = req.body;
  let userPresent = await userModel.find({ email });
  if (userPresent.length > 0) {
    res.send({ msg: "User is already exits, please login" });
  }
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      await userModel.create({ name, age, email, password: hash });
      res.send({ msg: "Sign up successfully" });
    });
  } catch (error) {
    console.log("Error", error);
    res.send("sign up failed");
  }
});

// to login
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.find({ email });
    if (user.length > 0) {
      let hashedPassword = user[0].password;
      bcrypt.compare(password, hashedPassword, async function (err, result) {
        // result == true
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "hush");
          res.send({ msg: "Login in successfully", token });
        } else {
          res.send({ err: "login failed" });
        }
      });
    }
  } catch (error) {
    console.log("Erorr", error);
    res.send({ err: "Login failed" });
  }
});
