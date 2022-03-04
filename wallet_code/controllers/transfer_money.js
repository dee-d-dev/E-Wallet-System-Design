const Wallet = require("../db/models/wallet");
const User = require("../db/models/user");

exports.transfer_money = (req, res) => {
  const { sender_email, receiver_email, sender_wallet_id, receiver_wallet_id } =
    req.body;
  const sender_email = User.findById(sender_email);
  const receiver_email = User.findById(receiver_email);

  if (sender && receiver) {
    const sender_wallet = Wallet.findById(sender_wallet_id);
    const receiver_wallet = Wallet.findById(receiver_wallet_id);
  }

  console.log(sender, receiver)
};
