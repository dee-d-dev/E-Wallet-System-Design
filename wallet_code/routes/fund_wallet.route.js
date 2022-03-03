const express = require("express");
const router = express.Router();
const { fund_wallet } = require("../controllers/fund_wallet.js");

router.post("/pay", fund_wallet);

module.exports = router;
