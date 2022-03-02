const { Schema, model } = require("mongoose");

const accountSchema = Schema(
  {
    balance: { type: Number, default: 0 },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    created_at: {
      type: Date.now(),
      default: Date.now(),
      required: true, 
    },
    updated_at: {
      type: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = model("account", accountSchema);
