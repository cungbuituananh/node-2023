const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOPtions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(cors(corsOPtions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));

app.use("/employees", require("./routes/api/employees"));

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
