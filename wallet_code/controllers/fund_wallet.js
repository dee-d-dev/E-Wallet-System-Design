const request = require("request");
const uuid = require("uuidv4");
const User = require("../db/models/User");
const Wallet = require("../db/models/wallet");
const Transaction = require("../db/models/Transaction");
const { uuidv4 } = require("uuidv4");
// const { token } = require("./login_user.controller");
const jwt = require("jsonwebtoken");

exports.fund_wallet = async (req, res) => {
  
  const user = await User.findOne({ email: req.decoded.email });

  const wallet_id = user.wallet_id;
  const { amount, reason, recipient } = req.body;


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

  await Transaction.create({
    wallet_id: wallet_id,
    transaction_type: "credit",
    amount: amount,
    description: reason,
    balanceBefore: wallet.balance - amount,
    balanceAfter: wallet.balance,
    // reference: uuidv4,
    //transaction_status: ['success', 'failed', 'pending']
  });

  return res.send({
    success: true,
    amount: wallet.balance,
  });
};
