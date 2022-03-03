const mongoose = require("mongoose");
const { v4 } = require("uuidv4");
const transactionSchema = new mongoose.Schema(
  {
   wallet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'wallet'
   },
    description: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    transaction_id: {
      type: Number,
      trim: true,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["debit", "credit"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    balanceBefore: {
      type: String,
      required: true,
    },
    balanceAfter: {
      type: String,
      required: true,
    },
    reference: v4(),
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
