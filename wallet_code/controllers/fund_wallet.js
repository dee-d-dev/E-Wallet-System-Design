const request = require("request");
const uuid = require("uuidv4");
const User = require("../db/models/User");
const Wallet = require("../db/models/wallet");
const mongoose = require("mongoose");

exports.fund_wallet = async (req, res) => {
  var options = {
    form: {
      source: "balance",
      reason: req.body.reason,
      amount: req.body.amount,
      email: req.body.email,
      recipient: req.body.recipient,
      wallet_id: req.body.wallet_id,
      currency: "NGN",
    },
  };

  const { wallet_id } = req.body;
  const { amount } = req.body;

  const wallet = await Wallet.findByIdAndUpdate(
    wallet_id,
    {
      $inc: { balance: amount },
    },
    { new: true }
  );
  if (!wallet)
    res.send({
      success: false,
      message: "wallet does not exist",
    });

  return res.send({
    success: true,
    amount: wallet.balance,
  });
};
