const mongoose = require("mongoose");

const transaction_schema = new mongoose.Schema({
  acc_id: { type: Number, required: true },
  payment_method: {
    type: String,
    enum: ["bank transfer", "card"],
    required: true,
  },
  tx_id: { type: String, required: true },
  tx_status: { type: String, required: true, enum: ["completed", "declined"] },
});

const Transaction = mongoose.model("transaction", transaction_schema);

module.exports = Transaction;
