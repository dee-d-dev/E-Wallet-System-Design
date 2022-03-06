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

const debit_wallet = require("./routes/debit_wallet");
const create_wallet = require("./routes/create_wallet");
const transfer_money = require("./routes/transfer_money.route");
const Wallet = require("./db/models/wallet");
const verifyToken = require("./middlewares/auth");

app.use("/api/v1", fund_wallet);

app.use("/api/v1", register_user);
app.use("/api/v1", login_user);
app.use("/api/v1", debit_wallet);
app.use("/api/v1", create_wallet);
app.use("/api/v1", transfer_money);

app.post("/my/webhook/url", function (req, res) {
  // Retrieve the request's body
  let event = req.body;
  // Do something with event
  res.send(200);
});

app.post("/webhook/url", (req, res) => {});

app.listen(5000, () => {
  console.log(`running on 5000`);
});

module.exports = app;
