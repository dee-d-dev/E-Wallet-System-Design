const request = require("request");
const uuid = require("uuidv4");
const User = require("../db/models/User");
const {
  validateUserWallet,
  createWalletTransaction,
  createTransaction,
} = require("./wallet_Processing");

exports.initiateTransfer = async (req, res) => {
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
    },
  };

  // check if customer exist in our database
  const user = await User.findOne({ email: req.body.email });

  // check if user have a wallet, else create wallet
  const wallet = await validateUserWallet(user._id);

  // create wallet transaction
  await createWalletTransaction(user._id, payment_status, currency, amount);

  // create transaction
  await createTransaction(
    user._id,
    id,
    payment_status,
    currency,
    amount,
    customer
  );

  //update wallet
  await updateWallet(user._id, amount);

  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
};
