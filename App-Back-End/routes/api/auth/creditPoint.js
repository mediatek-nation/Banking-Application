/*
  

  -------------------------------------------------
  
    * Admin can view all agent along with there credit point or reward point and label
    
    
    
*/
const express = require("express");
const router = express.Router();

//Load models
const Agent = require("../../../models/Agent");
//@route  GET api/auth/creditPoint
//@dscn   Admin can view creditPoint
//@access Private
router.get("/test", (req, res) => res.json({ msg: "creditPoint work" }));

//@route  POST api/auth/creditPoint
//@dscn   Admin can view all agent creditPoint and label
//@access Private
router.get("/", (req, res) => {
  Agent.find().then(result => {
    let agentResult = [];

    result.forEach(one => {
      let obj = {};
      obj.agentName = one.name;
      obj.agentCreditPoint = one.currentCreditPoint;
      obj.agentLabel = one.labels;
      agentResult.push(obj);
    });
    res.json(agentResult);
  });
});
module.exports = router;