const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for credit points
const CreditPointSchema = new Schema({
  indianRupees: {
    type: Number
  }
});
module.exports = CreditPoint = mongoose.model("creditPoint", CreditPointSchema);
