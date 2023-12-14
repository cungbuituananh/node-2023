const whitelist = ["https://www.youtube.com"];
const corsOPtions = {
  origin: (origin, callback) => {
    // console.log("origin: ", origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOPtions;
