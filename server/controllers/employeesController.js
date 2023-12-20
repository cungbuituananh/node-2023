const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  console.log("req: ", req.user);
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  res.send();
};

const updateEmployee = (req, res) => {
  res.send();
};

const deleteEmployee = (req, res) => {};

const getEmployee = (req, res) => {};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
