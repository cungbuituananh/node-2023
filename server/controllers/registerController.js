const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleCreateUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username/password/email are required" });
  }

  const duplicate = await User.findOne({ username }).exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const userObj = {
    username,
    password: hashedPwd,
  };

  const user = await User.create(userObj);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

module.exports = { handleCreateUser };
