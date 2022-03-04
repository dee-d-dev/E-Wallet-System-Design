const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  // wallet: [{ type: mongoose.Schema.Types.ObjectId, ref: "wallet" }],
  createdAt: { type: String, default: Date.now() },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
