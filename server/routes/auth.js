const jwt = require("jsonwebtoken");
const Registeration = require("../models/Schema");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.Secret_key);
    // console.log(verifyUser);
    const User = await Registeration.findOne({ _id: verifyUser._id });
    // console.log(User);
    req.token = token;
    req.user = User;
    next();
  } catch (error) {
    res.status(401).render("index");
  }
};
module.exports = auth;
