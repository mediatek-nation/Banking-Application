/*
  Agent can managed his/her profile: 
  -------------------------------------------------
    * Login and register.
    * Profile details updating.
    * Delete his/her profile
    * Agent can view all product 
    
*/
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load model
const Agent = require("../../models/Agent");
const keys = require("../../config/keys");
const Product = require("../../models/Product");

//@route  GET api/agent/test
//@dscn   Test the agent route
//@access Public
router.get("/test", (req, res) => res.json("Agent page working"));

//@route  POST api/agent/register
//@dscn   Register the agent route
//@access Public
router.post("/register", (req, res) => {
  //Check agent already exist or not
  Agent.findOne({ email: req.body.email }).then(agent => {
    if (agent) {
      return res.status(404).json({ email: "Agent already exist.." });
    } else {
      // New agent register
      const newAgent = new Agent({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        currentCreditPoint: "",
        labels: ""
      });

      // Generating hashing password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAgent.password, salt, (err, hash) => {
          if (err) throw err;
          newAgent.password = hash;
          newAgent
            .save()
            .then(agent => res.json(agent))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

//@route  POST api/agent/login
//@dscn   Login the agent route
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Agent.findOne({ email }).then(agent => {
    // Check agent is available or not
    if (!agent) {
      return res.json({ email: "Agent not found" });
    }

    // Check password to compare
    bcrypt.compare(password, agent.password).then(isMatch => {
      if (isMatch) {
        // Password match

        const payload = { id: agent.id, name: agent.name, email: agent.email }; // Create JWT payload

        //Create JWT Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            //console.log(payload);
            res.json({
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
  "/update/:id",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const agent = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile
    };
    Agent.findOneAndUpdate({ _id: id }, { $set: agent }, { new: true }).then(
      agent => res.json(agent)
    );
  }
);

//@route  GET api/agent/delete
//@dscn   Delete the agent profile
//@access Private
router.get("/delete/:id", (req, res) => {
  // Delete agent profile
  Agent.deleteOne({ _id: req.params.id }).then(profile =>
    res.json({ msg: "Deleted successfully" })
  );
});

//@route  GET api/agent/allProduct
//@dscn   Agent can view all product
//@access Private
router.get("/allProduct", (req, res) => {
  Product.find().then(product => res.json(product));
});

//@route  GET api/agent/current
//@dscn   Who is logedIn in agent profile
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
