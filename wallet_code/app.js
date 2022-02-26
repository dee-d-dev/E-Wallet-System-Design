const express = require("express");
const app = express();
require("dotenv").config();
const request = require("request");

const pug = require("pug");
const path = require("path");

const db_connection = require("./db/connect");
db_connection(process.env.MONGO_URI);
const {
  initializePayment,
  verifyPayment,
} = require("./payment_service_provider/paystack_api");

const register_user = require("./routes/reg_user.route.js");
const login_user = require("./routes/login_user.route.js");
const payment = require("./routes/payment.route.js");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", pug);

app.get("/api/v1/home", (req, res) => {
  res.render("index.pug");
});

app.use("/api/v1", register_user);
app.use("/api/v1", login_user);
app.use("/api/v1/payment", payment);

app.listen(5000, () => {
  console.log(`running on 5000`);
});

module.exports = app;
