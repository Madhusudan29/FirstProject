// Packages
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3008;
require("../server/db/conection");
const Router = require("../server/routes/router");
const cookieParser = require("cookie-parser");
// URL Encoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Patyhs and FIles
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Hello
// listining
app.use(Router);
app.listen(port, () =>
  console.log(`Server is listning on http://localhost:${port}`)
);
