const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  // Get auth in header
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("err: ", err);
    if (err) return res.sendStatus(403);
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;