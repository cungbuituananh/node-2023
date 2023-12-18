const express = require("express");
const router = express.Router();

const data = {};
data.employess = require("../../model/employees.json");
const { handleChangePw } = require("../../controllers/authController");

router.route("/").post(handleChangePw);
//   .put(updateEmployee)
//   .delete(deleteEmployee);

module.exports = router;
