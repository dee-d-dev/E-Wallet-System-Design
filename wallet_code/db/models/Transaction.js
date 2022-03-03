
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    phone: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
