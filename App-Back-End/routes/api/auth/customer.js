/* 
  * View all created customer
  * Update customer status after checking cibil score via API
  * Updating customer status after loan approval as well as update the agent credit point
  * Search via customer name and agentEmailid

*/
const express = require("express");
const router = express.Router();

// Load moduls
const Customer = require("../../../models/Customer");

//@route  GET api/auth/customer
//@dscn   Admin can test customer route
//@access Private
router.get("/test", (req, res) => res.json({ msg: "Customer work" }));

//@route  GET api/auth/customer/getAll
//@dscn   Admin can view customer details
//@access Private
router.get("/getAll", (req, res) => {
  Customer.find().then(customerResult => res.json(customerResult));
});

//@route  GET api/auth/customer/pendingCustomer/:id
//@dscn   Admin can update customer status
//@access Private
router.post("/pendingCustomer/:id", (req, res) => {
  // Update customer status
  const update = {
    currentStatus: "Pending for cibile score"
  };
  Customer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: update },
    { new: true }
  ).then(customerResult => res.json(" Update successfully.."));
});

//@route  GET api/auth/customer/cibileScore/:id
//@dscn   Admin can update customer status
//@access Private
router.post("/cibileScore/:id", (req, res) => {
  // Update customer status
  const update = {
    currentStatus: "Cibile Score complete"
  };
  Customer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: update },
    { new: true }
  ).then(customerResult => res.json(" Update successfully.."));
});

//@route  GET api/auth/customer/loanApproved/:id
//@dscn   Admin can update customer status
//@access Private
router.post("/loanApproved/:id", (req, res) => {
  // Update customer status
  const update = {
    currentStatus: "Loan is approved..",
    
  };
  Customer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: update },
    { new: true }
  ).then(customerResult => res.json(" Update successfully.."));
});

//@route  GET api/auth/customer/
//@dscn   Admin can search customer name and email id
//@access Private
router.get("/:searchText", (req, res) => {
  if (isEmail(req.params.searchText)) {
    Customer.find({ agenEmailId: new RegExp(req.params.searchText, "i") }).then(
      ismatch => {
        if (ismatch) {
          res.json(ismatch);
        } else {
          res.json("Name not match");
        }
      }
    );
  } else {
    Customer.find({ name: new RegExp(req.params.searchText, "i") }).then(
      ismatch => {
        if (ismatch) {
          res.json(ismatch);
        } else {
          res.json("Name not match");
        }
      }
    );
  }
});

module.exports = router;
