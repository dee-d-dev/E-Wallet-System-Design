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
  const sender = await User.findOne({ email: sender_email }).populate(
    "wallet_id"
  );
  const receiver = await User.findOne({ email: receiver_email });

  if (sender && receiver) {
    const sender_wallet = await sender.wallet_id;

    const receiver_wallet = receiver.wallet_id;
    // console.log(sender_wallet.balance)
    // const sender_wallet = await Wallet.findById(sender_wallet_id).select(
    //   "_id balance"
    // );

    // const receiver_wallet = await Wallet.findById(receiver_wallet_id).select(
    //   "_id"
    // );
    // res.status(200).send({ sender: sender, receiver: receiver });

    if (sender) {
      //if amount is lesser than balance then send money
      //   const receiver_balance = await Wallet.findByIdAndUpdate(
      //     receiver_wallet,
      //     {
      //       $inc: { balance: amount },
      //     },
      //     { new: true }
      //   );
      //   const sender_balance = await Wallet.findByIdAndUpdate(
      //     sender_wallet,
      //     {
      //       $inc: { balance: -amount },
      //     },
      //     { new: true }
      //   );

      //   res.send(sender_wallet, receiver_wallet);
      console.log(sender_wallet.balance);
      res.send(sender_wallet.balance);
      //   console.log(receiver_balance, sender_balance);
    } else {
      res.send("cannot process action");
    }
  }
};
