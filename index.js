require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOPtions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;
const connectDB = require("./config/dbConnect");

// Connect to MongoDB
connectDB();

app.use(logger);
app.use(credentials);

app.use(cors(corsOPtions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/change-password", require("./routes/api/changePassword"));

// Handle when any path don't have in routers
app.all("*", (req, res) => {
  // console.log("req: ", req);
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.send({ errorMsg: "404 Not Found!!!" });
  } else {
    res.type("txt").send("404 Not Found!!!");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
