const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// dotenv configuration
require("dotenv").config();

// Init app
const app = express();

// Load agent route file
const agent = require("./routes/api/agent");
const customer = require("./routes/api/customer");

// Load admin router file
const admin = require("./routes/api/auth/admin");
const custDetails = require("./routes/api/auth/customer");
const proDetails = require("./routes/api/auth/product");
const bonus = require("./routes/api/auth/bonus");
const creditPoint = require("./routes/api/auth/creditPoint");


// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect DB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport initiliza
app.use(passport.initialize());
require("./config/passport")(passport);

// Middleware agent route
app.use("/api/agent", agent);
app.use("/api/customer", customer);

// Middleware admin route
app.use("/api/auth/admin", admin);
app.use("/api/auth/customer", custDetails);
app.use("/api/auth/product", proDetails);
app.use("/api/auth/bonus", bonus);
app.use("/api/auth/creditPoint", creditPoint);


// Server running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
