const express = require("express");
const app = express();
require("dotenv").config();
const request = require("request");

const db_connection = require("./db/connect");
db_connection(process.env.MONGO_URI);
const register_user = require("./routes/reg_user.route.js");
const login_user = require("./routes/login_user.route.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/home", (req, res) => {
  res.send("welcome");
});

app.use("/api/v1", register_user);
app.use("/api/v1", login_user);

app.listen(5000, () => {
  console.log(`running on 5000`);
});

module.exports = app;
