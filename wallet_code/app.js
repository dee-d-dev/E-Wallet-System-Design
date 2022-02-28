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

app.post(
  "https://web.hook.sh/#/9e087a6d-b602-4da3-838a-984481f824a6/5834caba-9566-4772-911a-18d95d121163",
  function (req, res) {
    // Retrieve the request's body
    let event = req.body;
    // Do something with event
    res.send(200);
  }
);

let crypto = require("crypto");

// Using Express
app.post("/my/webhook/url", function (req, res) {
  //validate event
  var hash = crypto
    .createHmac("sha512", process.env.SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["x-paystack-signature"]) {
    // Retrieve the request's body
    var event = req.body;
    // Do something with event
  }
  res.send(200);
});

app.listen(5000, () => {
  console.log(`running on 5000`);
});

module.exports = app;
