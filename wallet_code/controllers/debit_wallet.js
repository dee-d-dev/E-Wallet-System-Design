const Wallet = require("../db/models/wallet");
const Transaction = require("../db/models/Transaction");

exports.debit_wallet = async (req, res) => {
  let options = {
    form: {
      amount: req.body.amount,
      wallet_id: req.body.wallet_id,
    },
  };
  const { wallet_id, amount, reason, recipient } = req.body;

  //   const walletAmount = await Wallet.findById(wallet_id);

  //   if (walletAmount.balance < amount) {
  //     return res.send({
  //       success: false,
  //       message: "Insuffucient Funds",
  //     });
  //   }

  const wallet = await Wallet.findByIdAndUpdate(
    wallet_id,
    {
      $inc: { balance: -amount },
    },
    { new: true }
  );

  //   wallet.balance = amount;

  if (!wallet)
    res.send({
      success: false,
      message: "wallet does not exist",
    });

  await Transaction.create({
    wallet_id: wallet_id,
    transaction_type: "debit",
    description: reason,
    balanceBefore: wallet.balance,
    balanceAfter: wallet.balance - amount,
    amount: amount,
    // reference: uuidv4,
  });

  res.send({
    success: true,
    amount: wallet.balance,
  });
};
