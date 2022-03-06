const Wallet = require("../db/models/wallet");
const User = require("../db/models/User");
const Transaction = require("../db/models/Transaction");

//you can send money to another via email
exports.transfer_money = async (req, res) => {
  const {
    receiver_email,
    amount,
    sender_wallet_id,
    receiver_wallet_id,
    reason,
  } = req.body;

  const sender = await User.findOne({ email: req.decoded.email }).populate(
    "wallet_id"
  );
  const receiver = await User.findOne({ email: receiver_email });

  if (sender && receiver) {
    const sender_wallet = await sender.wallet_id;

    const receiver_wallet = receiver.wallet_id;

    if (amount < sender_wallet.balance) {
      //if amount is lesser than balance then send money
      const receiver_balance = await Wallet.findByIdAndUpdate(
        receiver_wallet,
        {
          $inc: { balance: amount },
        },

        { new: true }
      );
      const sender_balance = await Wallet.findByIdAndUpdate(
        sender_wallet,
        {
          $inc: { balance: -amount },
        },
        { new: true }
      );

      // await Transaction.create({
      //   wallet_id: receiver.wallet_id,
      //   transaction_type: "credit",
      //   amount: amount,
      //   description: reason,
      //   balanceBefore: receiver_wallet.balance,
      //   balanceAfter: receiver_wallet.balance + amount,
      // reference: uuidv4,
      //transaction_status: ['success', 'failed', 'pending']
      // }),
      res.status(200).send({ success: true, amount: amount });
    } else {
      res.send({ success: false, message: "Insufficient balance" });
    }

    //Add transactions for the transfers
  }
};
