const Wallet = require("../db/models/wallet");
const Transaction = require("../db/models/Transaction");
const User = require("../db/models/User");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const { token } = require("../controllers/login_user.controller");

exports.debit_wallet = async (req, res) => {
  const user = await User.findOne({ email: req.decoded.email });
  const { amount, reason, recipient } = req.body;
  let wallet_id = user.wallet_id;
  const walletAmount = await Wallet.findById(wallet_id);

  if (walletAmount.balance < amount) {
    return res.send({
      success: false,
      message: "Insuffucient Funds",
    });
  }

  const wallet = await Wallet.findByIdAndUpdate(
    wallet_id,
    {
      $inc: { balance: -amount },
    },
    { new: true }
  );

  let transaction = await Transaction.create({
    wallet_id: wallet_id,
    transaction_type: "debit",
    description: reason,
    balanceBefore: wallet.balance,
    amount: amount,
    // reference: uuidv4,
  });
  //   wallet.balance = amount;

  if (!wallet)
    res.send({
      success: false,
      message: "wallet does not exist",
    });

  transaction.balanceAfter = wallet.balance - amount;

  await transaction.save();

  res.send({
    success: true,
    wallet_balance: wallet.balance,
  });
};
