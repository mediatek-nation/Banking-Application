const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for agent
const AgentSchema = new Schema(
  {
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number
  },
  currentCreditPoint: {
    type: String
  },
  labels: {
    type: String
  },
  withdrawMoney: [
    {
      withdrawAmount: {
        type: Number
      },
      withdrawDate: {
        type: String
      }
    }
  ],
  profileImage: {
    type: String
  },
  joiningDate: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Agent = mongoose.model("agent", AgentSchema);
