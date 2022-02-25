const express = require("express");
const app = express();
require("dotenv").config();

const db_connection = require('./db/connect')
const register_user = require("./routes/reg_user.route.js");

db_connection(process.env.MONGO_URI)

app.get("/api/v1/home", (req, res) => {
  res.send("welcome");
});

app.use("/api/v1", register_user);

app.listen(5000, () => {
  console.log(`running on 5000`);
});

module.exports = app;
