const mongoose = require("mongoose");

const transaction_schema = new mongoose.Schema({
  acc_id: { type: Number.EPSILON, required: true },
  payment_method: {
    type: String,
    enum: ["bank transfer", "card"],
    required: true,
  },
  tx_id: { type: String, required: true },
});

const Transaction = mongoose.model("transaction", transaction_schema);

module.exports = Transaction
