const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
