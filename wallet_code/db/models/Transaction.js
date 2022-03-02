// const mongoose = require("mongoose");

// const transaction_schema = new mongoose.Schema({
//   acc_id: { type: Number, required: true },
//   payment_method: {
//     type: String,
//     enum: ["bank transfer", "card"],
//     required: true,
//   },
//   tx_id: { type: String, required: true },
//   tx_status: { type: String, required: true, enum: ["completed", "declined"] },
// });

// const Transaction = mongoose.model("transaction", transaction_schema);

// module.exports = Transaction;

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
