const Registeration = require("../models/Schema");
const bcrypt = require("bcryptjs");
exports.registration = async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password === confirmpassword) {
      // const registerEmployee = new Registeration(req.body);
      const registerEmployee = new Registeration({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        password: password,
        confirmpassword: confirmpassword,
      });
      const token = await registerEmployee.generateToken();
      res.cookie("jwt", token);
      //, {expires: new Date(Date.now() + 50000),httpOnly: true,secure:true}
      const Registered = await registerEmployee.save();
      console.log(Registered);
      res.status(201).render("index");
    } else {
      res.send("Confirm Passwords are not Same!");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logins = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const UserEmail = await Registeration.findOne({ email });
    const isMatch = await bcrypt.compare(password, UserEmail.password);
    const token = await UserEmail.generateToken();
    console.log("token " + token);
    res.cookie("jwt", token);
    //, {expires: new Date(Date.now() + 50000),httpOnly: true,secure:true}
    if (isMatch) {
      // if (UserEmail.password === password) {
      res.status(201).render("index");
      // console.log(UserEmail); console.log(UserEmail.password);
    } else {
      console.log(`Password Not Mached With Account Password`);
      res.status(400).send("Invalid Login Details");
    }
  } catch (error) {
    res.status(400).send("User Not Registered!");
  }
};
// jwt & // passport
// cookies
// session
