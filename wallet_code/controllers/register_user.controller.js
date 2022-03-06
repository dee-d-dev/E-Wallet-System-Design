const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const Wallet = require("../db/models/wallet");

const reg_user = async (req, res) => {
  const user = new User(req.body);
  const { email } = req.body;

  if (!user) {
    res.send("error occured");
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("this email has already been registered");
  }

  user.password = hashedPassword;

  let wallet = await Wallet.create({
    balance: 0,
    new: true,
    password: hashedPassword,
  });
  // user_id: user.id;

  user.wallet_id = wallet._id;

  await user
    .save()
    .then((user) => {})
    .catch((err) => {
      res.send(err._message);
      console.log(err);
    });

  let token = await jwt.sign(
    { email: user.email, iss: "adedotun" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );

  user.token = token;

  res.status(201).send({
    success: true,
    message: "created successfully",
    token: token,
  });
};

module.exports = reg_user;
