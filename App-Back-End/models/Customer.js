const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for customer
const CustomerSchema = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  mobile: {
    type: Number
  },
  idProof: {
    idProofType: {
      type: String
    },
    idProofNumber: {
      type: String
    }
  },
  loanTitle: {
    type: String
  },
  loanAmount: {
    type: Number
  },
  currentStatus: {
    type: String,
    default: "created" // cibilScore   loanApproved    finish
  },
  agentId: {
    type: String
  },
  agentEmailId: {
    type: String
  },
  applyDate: {
    type: Date
  }
});
module.exports = Customer = mongoose.model("customer", CustomerSchema);
