const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
