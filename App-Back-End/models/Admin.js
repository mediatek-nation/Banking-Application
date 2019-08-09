const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for admin
const AdminSchema = new Schema({
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
  joiningDate: {
    type: String
  },
  Date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Admin = mongoose.model("admin", AdminSchema);
