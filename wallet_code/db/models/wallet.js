const { Schema, model } = require("mongoose");

const walletSchema = Schema(
  {
    balance: { type: Number, default: 0, required: true },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    created_at: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Wallet = model("wallet", walletSchema);
module.exports = Wallet;
