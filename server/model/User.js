const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  },
  level: {
    type: Number,
    // require: true,
  },
  phone: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  roles: [
    {
      type: Number,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
