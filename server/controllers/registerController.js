const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleCreateUser = async (req, res) => {
  const { username, pwd, parentId, phone, active = true, level } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  const hashedPwd = await bcrypt.hash(pwd, 10);
  const userObj = {
    username: user,
    password: hashedPwd,
    parentId: parentId ?? null,
    phone,
    active,
    level,
  };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

module.exports = { handleCreateUser };
