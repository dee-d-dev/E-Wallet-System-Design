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
    transaction_id: {
      type: Number,
      trim: true,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["debit", "credit"],
    },
    balanceBefore: {
      type: Number,
    },
    balanceAfter: {
      type: Number,
    },
    // reference: {
    //   type: String,
    // },
    amount: {
      type: Number,
      required: [true, "amount is required"],
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
