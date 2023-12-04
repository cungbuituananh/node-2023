const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvents = async (msg) => {
  const dateTime = format(new Date(), "hh:mm\tdd/MM/yyyy");
  const logItem = `${dateTime}\t${uuid()}\t${msg}`;

  try {
    await fsPromise.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem
    );
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = logEvents;
