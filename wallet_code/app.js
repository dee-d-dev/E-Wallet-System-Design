const express = require("express");
const app = express();
const request = require("request");
const config = require('./config.js')

const db_connection = require("./db/connect");

db_connection(config.MONGO_URI);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const register_user = require("./routes/register_user.route.js");
const login_user = require("./routes/login_user.route.js");
const fund_wallet = require("./routes/fund_wallet.route.js");

const debit_wallet = require("./routes/debit_wallet");
const create_wallet = require("./routes/create_wallet");
const transfer_money = require("./routes/transfer_money.route");
const Wallet = require("./db/models/wallet");
const verifyToken = require("./middlewares/auth");

console.log(`NODE_ENV: ${config.NODE_ENV}`)

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

app.listen(config.PORT, config.HOST,() => {
  console.log(`running on ${config.HOST}:${config.PORT}`);
});

module.exports = app;
