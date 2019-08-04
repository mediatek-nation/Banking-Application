/*
                 Customer Management:
        ---------------------------------------------
      * Addition of custermer details.
      * To show pending customer records.
      * Complete customer records.
*/
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load models
const Customer = require("../../models/Customer");

//@route  GET api/customer/test
//@dscn   Test the customer route
//@access Private
router.get("/", (req, res) => res.send("Customer page working"));

//@route  POST api/customer/register
//@dscn   Register the customer route
//@access Private
router.post(
  "/register",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Create a new customer records
    const customer = {
      name: req.body.name,
      address: req.body.address,
      mobile: req.body.mobile,
      idProof: req.body.idProof,
      loanTitle: req.body.loanTitle,
      loanAmount: req.body.loanAmount,
      currentStatus: req.body.currentStatus,
      agentId: req.body.agentId,
      agentEmailId: req.body.agentEmailId,
      applyDate: req.body.applyDate
    };
    const newCustomer = new Customer(customer);
    newCustomer
      .save()
      .then(data =>
        res.json({ msg: "Customer records successfully register." })
      );
  }
);

module.exports = router;
