/*
  Admin can managed his/her profile: 
  -------------------------------------------------
    * Login and register.
    * Profile details updating.
    * Delete his/her profile
*/
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load model
const Admin = require("../../../models/Admin");
const keys = require("../../../config/keys");

//@route  GET api/auth/test
//@dscn   Test the admin route
//@access Public
router.get("/", (req, res) => res.json("Admin page working"));

//@route  POST api/auth/register
//@dscn   Register the admin route
//@access Public
router.post("/register", (req, res) => {
  //Check admin already exist or not
  Admin.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      return res.status(404).json({ email: "Admin already exist.." });
    } else {
      // New admin register
      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
      });

      // Generating hashing password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

//@route  POST api/auth/login
//@dscn   Login the admin route
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email }).then(admin => {
    // Check admin is available or not
    if (!admin) {
      return res.json({ email: "Admin not found" });
    }

    // Check password to compare
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        // Password match

        const payload = { id: admin.id, name: admin.name, email: admin.email }; // Create JWT payload

        //Create JWT Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "36000" },
          (err, token) => {
            return res.json({
              success: true,
              token: "Bearar" + token,
              payload
            });
          }
        );
      } else {
        return res.json({ password: "Password incurrect" });
      }
    });
  });
});

//@route  POST api/agent/update
//@dscn   Update the records in admin route
//@access Private
router.post(
  "/update:id",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const admin = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile
    };
    Admin.findOneAndUpdate({ _id: id }, { $set: admin }, { new: true }).then(
      admin => res.json(admin)
    );
  }
);

//@route  GET api/auth/delete
//@dscn   To delete admin profile
//@access Private

//@route  GET api/auth/current
//@dscn   Who is logedIn in the admin route
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      name: admin.body.name,
      email: admin.body.email
    });
  }
);

module.exports = router;
