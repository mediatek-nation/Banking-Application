const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for bonus
const BonusSchema = new Schema({
  creditPoint: {
    type: String
  },
  bonusCreditPoint: {
    type: String
  },
  agentLabel: {
    type: String
  }
});
module.exports = Bonus = mongoose.model("bonus", BonusSchema);
