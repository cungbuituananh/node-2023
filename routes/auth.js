const express = require("express");
const router = express.Router();

const { handleLogin, handleLogout } = require("../controllers/authController");

router.post("/login", handleLogin);
router.get("/logout", handleLogout);

module.exports = router;
