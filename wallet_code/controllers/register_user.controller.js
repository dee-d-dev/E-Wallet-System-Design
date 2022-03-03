const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");

const reg_user = async (req, res) => {
  const user = new User(req.body);
  const wallet = require("../db/models/wallet");
  const { email } = req.body;

  if (user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userExists = await User.findOne({ email });

    if (!userExists) {
      user.password = hashedPassword;
      user
        .save()
        .then((user) => {
          // console.log(user);
          res.status(201).send(user);
        })
        .catch((err) => {
          res.send(err._message);
          console.log(err);
        });

      wallet.create({ balance: 0, user_id: user.id });
    } else {
      res.status(400).send("this email has already been registered");
    }
  }
};

module.exports = reg_user;
