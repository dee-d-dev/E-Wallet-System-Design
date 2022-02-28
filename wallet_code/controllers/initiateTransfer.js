const request = require("request");
const uuid = require("uuidv4");
const User = require("../db/models/User");
const {
  validateUserWallet,
  createWalletTransaction,
  createTransaction,
  updateWallet,
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
      currency: "NGN",
    },
  };

  // check if customer exist in our database
  const user = await User.findOne({ email: req.body.email });

  // check if user have a wallet, else create wallet
  const wallet = await validateUserWallet(user._id);

  // create wallet transaction
  await createWalletTransaction({
    userId: user._id,
    currency: req.body.currency,
    amount: req.body.amount,
  });

  // create transaction
  await createTransaction({
    userId: user._id,
    currency: req.body.currency,
    amount: req.body.amount,
    user: user,
  });

  //update wallet
  await updateWallet({ userId: user._id, amount: req.body.amount });

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};
