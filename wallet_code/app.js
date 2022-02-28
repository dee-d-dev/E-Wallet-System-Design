const express = require("express");
const app = express();
require("dotenv").config();
const request = require("request");

const db_connection = require("./db/connect");
db_connection(process.env.MONGO_URI);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const register_user = require("./routes/reg_user.route.js");
const login_user = require("./routes/login_user.route.js");
const initiateTransfer = require("./routes/initiateTf.route.js");
const verifyAccount = require("./routes/verifyAccount.route");
const txRecipient = require("./routes/TxRecipient.route");
const finalizeTransfer = require("./routes/finalizeTransfer.route");

app.use("/api/v1", verifyAccount);
app.use("/api/v1", txRecipient);
app.use("/api/v1", initiateTransfer);
app.use("/api/v1", finalizeTransfer);

app.use("/api/v1", register_user);
app.use("/api/v1", login_user);

app.listen(5000, () => {
  console.log(`running on 5000`);
});

module.exports = app;
