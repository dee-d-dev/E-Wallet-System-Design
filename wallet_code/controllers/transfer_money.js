const Wallet = require("../db/models/wallet");
const User = require("../db/models/User");

exports.transfer_money = async (req, res) => {
  const {
    sender_email,
    receiver_email,
    amount,
    sender_wallet_id,
    receiver_wallet_id,
  } = req.body;
  const sender = await User.findOne(sender_email);
  const receiver = await User.findOne(receiver_email);

  if (sender && receiver) {
    const sender_wallet = await Wallet.findById(sender_wallet_id).select(
      "_id balance"
    );

    const receiver_wallet = await Wallet.findById(receiver_wallet_id)
      .select("_id")
      .populate("user_id", "email -_id");
    res.status(200).send({ sender: sender_wallet, receiver: receiver_wallet });
    

    if (amount < sender_wallet.balance) {
      receiver_wallet.balance = amount;
      const receiver_balance = await Wallet.findByIdAndUpdate(
        receiver_wallet_id,
        {
          $inc: { balance: amount },
        },
        { new: true }
      );
      const sender_balance = await Wallet.findOneAndUpdate(
        sender_wallet_id,
        {
          $inc: { balance: -amount },
        },
        { new: true }
      );

      console.log(receiver_balance, sender_balance);
    }
  }
};
