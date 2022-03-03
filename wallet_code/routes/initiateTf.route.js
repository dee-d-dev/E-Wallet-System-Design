const express = require("express");
const router = express.Router();
const { initiateTransfer } = require("../controllers/fund_wallet.js");

router.post("/pay", initiateTransfer);

module.exports = router;
