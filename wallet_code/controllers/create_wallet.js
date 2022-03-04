const User = require("../db/models/User");
const joi = require("joi");
const Wallet = require("../db/models/wallet");

const create_wallet = async (req, res) => {
  const wallet = new Wallet(req.body);
  //   const user = new User(req.body);
  const { user_id } = req.body;
  const { balance } = req.body;

  const user = User.findById(user_id);

  if (user) {
    Wallet.create({
      balance: balance,
      user_id: user_id,
      new: true,
    });

    wallet.save(() => {
      res.send(wallet);
    });
  } else {
    res.status(400).send({
      success: false,
      message: "Wallet not created",
    });
  }
};

module.exports = create_wallet;
