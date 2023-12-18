const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
