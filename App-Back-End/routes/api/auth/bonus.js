/*
 * Insert
 * Match id to id and update
 * Match id to id and delete
 * Get findOne match id to id
 ** Searching by any three of the field
 */
const express = require("express");
const router = express.Router();

//Load models
const Bonus = require("../../../models/Bonus");
//@route  GET api/auth/bonus
//@dscn   Admin can create bonus
//@access Private
router.get("/test", (req, res) => res.json({ msg: "Bonus work" }));

//@route  POST api/auth/bonus/addBonus
//@dscn   Admin can add bonus
//@access Private
router.post("/addBonus", (req, res) => {
  // Create a new bonus
  const bonus = {
    creditPoint: req.body.creditPoint,
    bonusCreditPoint: req.body.bonusCreditPoint,
    agentLabel: req.body.agentLabel
  };
  const newBonus = new Bonus(bonus);
  newBonus
    .save()
    .then(bonus => res.json({ msg: "Bonus create successfully register" }));
});

//@route  POST api/auth/bonus/addBonus/:id
//@dscn   Admin can update addBonus
//@access Private
router.post("/addBonus/:id", (req, res) => {
  // Update product
  const bonus = {
    creditPoint: req.body.creditPoint,
    bonusCreditPoint: req.body.bonusCreditPoint,
    agentLabel: req.body.agentLabel
  };

  Bonus.findOneAndUpdate(
    { _id: req.params.id },
    { $set: bonus },
    { new: true }
  ).then(bonusResult => res.json(bonusResult));
});

//@route  GET api/auth/bonus/deleteBonus/:id
//@dscn   Admin can delete bonus
//@access Private
router.get("/deleteBonus/:id", (req, res) => {
  // Delete bonus modules
  Bonus.deleteOne({ _id: req.params.id }).then(DeleteBonus =>
    res.json({ msg: "Bonus successfully deleted..!" })
  );
});

//@route  GET api/auth/bonus/getAll/:searchText
//@dscn   Admin can search bonus by any three field
//@access Private
router.get("/getAll/:searchText", (req, res) => {
  let searchText = req.params.searchText;
  Bonus.find({
    $or: [
      { creditPoint: new RegExp(+searchText, "i") },
      { bonusCreditPoint: new RegExp(+searchText, "i") },
      { agentLabel: new RegExp(searchText, "i") }
    ]
  }).then(bonusResult => res.json(bonusResult));
});

//@route  GET api/auth/bonus/getOne/:id
//@dscn   Admin can search bonus details by id
//@access Private
router.get("/getOne/:id", (req, res) => {
  Bonus.findOne({ _id: req.params.id }).then(bonusResult =>
    res.json(bonusResult)
  );
});

//@route  GET api/auth/bonus/getAll
//@dscn   Admin can search all bonus
//@access Private
router.get("/getAll", (req, res) => {
  Bonus.find().then(bonusResult => res.json(bonusResult));
});

module.exports = router;
