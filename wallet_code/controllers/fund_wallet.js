const request = require("request");
const uuid = require("uuidv4");
const User = require("../db/models/User");
const Wallet = require("../db/models/wallet");
const Transaction = require("../db/models/Transaction");
const { uuidv4 } = require("uuidv4");

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

  const { wallet_id, amount, reason, recipient } = req.body;

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
    description: req.body.reason,
    balanceBefore: wallet.balance,
    balanceAfter: wallet.balance + amount,
    reference: uuidv4,
  });
  return res.send({
    success: true,
    amount: wallet.balance,
  });
};
