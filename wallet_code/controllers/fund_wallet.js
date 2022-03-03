const request = require("request");
const uuid = require("uuidv4");
const User = require("../db/models/User");
const {
  validateUserWallet,
  createWalletTransaction,
  createTransaction,
  updateWallet,
} = require("./wallet_Processing");

exports.fund_wallet = async (req, res) => {
  var options = {
    method: "POST",
    url: "https://api.paystack.co/transfer",
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    form: {
      source: "balance",
      reason: req.body.reason,
      amount: req.body.amount,
      email: req.body.email,
      recipient: req.body.recipient,
      currency: "NGN",
    },
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
};
