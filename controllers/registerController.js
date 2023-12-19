const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.user = data;
  },
};

const User = require("../model/User");

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, pwd, parentId, phone } = req.body;

  // Check haven't username or pwd
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // // Check exist user in JSON
  // const existUser = usersDB.users.find((item) => item.username === user);
  // if (existUser)
  //   return res.sendStatus(409).json({ message: "This username exists" });

  // check for duplicate usernames in the MongoDB
  const duplicate = await User.findOne({ username: user }).exec();

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Store the new user in JSON
    // const newUser = { username: user, password: hashedPwd };
    // usersDB.setUsers([...usersDB.users, newUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log("result: ", result);

    res.status(200).json({ success: `New user ${user} created!` });
  } catch (error) {
    console.log("error handle new user: ", error);
  }
};

module.exports = { handleNewUser };
