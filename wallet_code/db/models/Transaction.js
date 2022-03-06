const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    wallet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallet",
    },
    description: {
      type: String,
      required: true,
    },
    sender: { type: String },
    receiver: { type: String },
    transaction_id: {
      type: Number,
      trim: true,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["debit", "credit", "transfer"],
    },
    sender_balanceBefore: {
      type: Number,
    },
    sender_balanceAfter: {
      type: Number,
    },
    receiver_balanceBefore: { type: Number },
    receiver_balanceAfter: { type: Number },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    transaction_status: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
