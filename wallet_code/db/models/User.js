const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
});

mongoose.model('user', UserSchema)
