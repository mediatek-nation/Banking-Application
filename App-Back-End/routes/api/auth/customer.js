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

//@route  GET api/auth/customer
//@dscn   Admin can view customer details
//@access Private
router.get("/", (req, res) => {
  Customer.find().then(customer => res.json(customer));
});



module.exports = router;
