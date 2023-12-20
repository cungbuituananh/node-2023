const express = require("express");
const router = express.Router();
const {
  getEmployee,
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../../controllers/employeesController");
const data = {};
data.employess = require("../../model/employees.json");

router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").post(getEmployee);

module.exports = router;
