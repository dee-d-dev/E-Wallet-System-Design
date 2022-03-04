const Wallet = require("../db/models/wallet");
const User = require("../db/models/user");

exports.transfer_money = (req, res) => {
  const { sender_id, receiver_id, sender_wallet_id, receiver_wallet } =
    req.body;
  const sender = Wallet.findById(sender_id);
  const receiver = Wallet.findById(receiver_id);

  if (sender && receiver) {
    const sender_wallet = Wallet.findById(sender_wallet_id);
    const receiver_wallet = Wallet.findById(receiver_wallet_id);
  }

  console.log(sender, receiver)
};
