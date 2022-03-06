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
const fund_wallet = require("./routes/fund_wallet.route.js");
const txRecipient = require("./routes/TxRecipient.route");
const finalizeTransfer = require("./routes/finalizeTransfer.route");

const debit_wallet = require("./routes/debit_wallet");
const create_wallet = require("./routes/create_wallet");
const transfer_money = require("./routes/transfer_money.route");
const Wallet = require("./db/models/wallet");
const verifyToken = require("./middlewares/auth");

app.use("/api/v1", txRecipient);
app.use("/api/v1",verifyToken, fund_wallet);
app.use("/api/v1", finalizeTransfer);

app.use("/api/v1", register_user);
app.use("/api/v1", login_user);
app.use("/api/v1",verifyToken, debit_wallet);
app.use("/api/v1",verifyToken, create_wallet);
app.use("/api/v1",verifyToken, transfer_money);

app.post("/my/webhook/url", function (req, res) {
  // Retrieve the request's body
  let event = req.body;
  // Do something with event
  res.send(200);
});

app.post("/webhook/url", (req, res) => {});

app.get("/me", verifyToken, (req, res) => {
  res.send("welcome");
  // var token = req.headers["x-access-token"];
  // if (!token)
  //   return res.status(401).send({ auth: false, message: "No token provided." });
  // jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
  //   if (err)
  //     return res
  //       .status(500)
  //       .send({ auth: false, message: "Failed to authenticate token." });

  //   res.status(200).send(decoded);
  // });
});

app.get('/verify', verifyToken)

app.listen(5000, () => {
  console.log(`running on 5000`);
});

module.exports = app;
