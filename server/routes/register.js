const express = require("express");
const router = express.Router();

const { handleCreateUser } = require("../controllers/registerController");

router.post("/", handleCreateUser);

module.exports = router;
