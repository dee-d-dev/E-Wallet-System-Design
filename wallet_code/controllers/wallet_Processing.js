const Wallet = require("../db/models/wallet");
const Wallet_TX = require("../db/models/walletTransaction");
const Transaction = require("../db/models/Transaction");

//validate
exports.validateUserWallet = async (userId) => {
  try {
    // check if user have a wallet, else create wallet
    const userWallet = await Wallet.findOne({ userId });

    // If user wallet doesn't exist, create a new one
    if (!userWallet) {
      // create wallet
      const wallet = await Wallet.create({
        userId,
      });
      return wallet;
    }
    return userWallet;
  } catch (error) {
    console.log(error);
  }
};

// Create Wallet Transaction
exports.createWalletTransaction = async (
  userId,
  payment_status,
  currency,
  amount
) => {
  try {
    // create wallet transaction
    const walletTransaction = await Wallet_TX.create({
      amount,
      userId,
      isInflow: true,
      currency,
      // payment_status,
    });
    return walletTransaction;
  } catch (error) {
    console.log(error);
  }
};

// Create Transaction
exports.createTransaction = async (
  userId,
  id,
  status,
  currency,
  amount,
  user
) => {
  try {
    // create transaction
    const transaction = await Transaction.create({
      userId,
      transactionId: id,
      name: user.name,
      email: user.email,
      phone: user.phone_number,
      amount,
      currency,
      paymentStatus: status,
      paymentGateway: "Paystack",
    });
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

// Update wallet
exports.updateWallet = async (userId, amount) => {
  try {
    // update wallet
    const wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { new: true }
    );
    return wallet;
  } catch (error) {
    console.log(error.message);
  }
};
