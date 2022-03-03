const express = require("express");
const router = express.Router();
const { send_money_via_email } = require("../controllers/sendMoney.js");

router.get("/send", send_money_via_email);

module.exports = router;
