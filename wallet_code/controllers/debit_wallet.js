const Wallet = require("../db/models/wallet");
const Transaction = require("../db/models/Transaction");
const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");

exports.debit_wallet = async (req, res) => {
  const user = await User.findOne({ email: req.decoded.email });
  const { amount, reason, password } = req.body;
  let wallet_id = user.wallet_id;
  const walletAmount = await Wallet.findById(wallet_id);
  const schema = joi.object({
    amount: joi.number().required(),
    reason: joi.string().required(),
    password: joi.string().required(),
  });

  const validation = schema.validate({ amount, reason, password });
  if (!validation) return res.send("input fields not fully filled");

  let authenticated = await bcrypt.compare(password, walletAmount.password);
  if (!authenticated) {
    res.send("wrong password");
  }

  if (walletAmount.balance < amount) {
    return res.send({
      success: false,
      message: "Insuffucient Funds",
    });
  }

  const wallet = await Wallet.findByIdAndUpdate(
    wallet_id,
    {
      $inc: { balance: -amount },
    },
    { new: true }
  );

  let transaction = await Transaction.create({
    wallet_id: wallet_id,
    transaction_type: "debit",
    description: reason,
    balanceBefore: wallet.balance,
    amount: amount,
    // reference: uuidv4,
  });
  //   wallet.balance = amount;

  if (!wallet)
    res.send({
      success: false,
      message: "wallet does not exist",
    });

  transaction.balanceAfter = wallet.balance - amount;

  await transaction.save();

  res.send({
    success: true,
    wallet_balance: wallet.balance,
  });
};
