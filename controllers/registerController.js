const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.user = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  // Check haven't username or pwd
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check exist user in DB
  const existUser = usersDB.users.find((item) => item.username === user);
  if (existUser)
    return res.sendStatus(409).json({ message: "This username exists" });

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.status(200).json({ success: `New user ${user} created!` });
  } catch (error) {
    console.log("error handle new user: ", error);
  }
};

module.exports = { handleNewUser };
