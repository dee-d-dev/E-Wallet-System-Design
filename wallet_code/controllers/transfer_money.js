const Wallet = require("../db/models/wallet");
const User = require("../db/models/User");

exports.transfer_money = async (req, res) => {
  const { sender_email, receiver_email, sender_wallet_id, receiver_wallet_id } =
    req.body;
  const sender = await User.findOne(sender_email);
  const receiver = await User.findOne(receiver_email);

  const sender_wallet = await Wallet.findById(sender_wallet_id).select("_id");
  const receiver_wallet = await Wallet.findById(receiver_wallet_id).select('_id').populate(
    "user_id",
    "email -_id"
  );
  res.status(200).send({ sender: sender_wallet, receiver: receiver_wallet });

};
