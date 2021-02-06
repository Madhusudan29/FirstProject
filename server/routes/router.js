const express = require("express");
const Router = express.Router();
const controller = require("./controller");
const auth = require("./auth");
// Routes
Router.get("/", (req, res) => {
  res.render("index", { title: "Index Page" });
});
Router.get("/secret", auth, (req, res) => {
  // console.log(`Cookie ${req.cookies.jwt}`);
  res.render("secret", { title: "Secret Page" });
});
Router.get("/logout", auth, async (req, res) => {
  try {
    // req.user.tokens = req.user.tokens.filter((element,index,array,this)=>{})
    req.user.tokens = req.user.tokens.filter((currentElem) => {
      // Token is the current token
      return currentElem.token !== req.token;
    });
    res.clearCookie("jwt");
    console.log("Logged out");
    await req.user.save();
    res.render("loginform", { title: "Logged Page" });
  } catch (error) {
    res.status(500).send(error);
  }
});
Router.get("/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    res.clearCookie("jwt");
    console.log("Logged out");
    await req.user.save();
    res.render("loginform", { title: "Logged Page" });
  } catch (error) {
    res.status(500).send(error);
  }
});
Router.get("/login", (req, res) => {
  res.render("loginform", { title: "Login Form" });
});
Router.get("/register", (req, res) => {
  res.render("registration", { title: "Registration Form" });
});
Router.post("/user/register", controller.registration);
Router.post("/user/login", controller.logins);
module.exports = Router;
