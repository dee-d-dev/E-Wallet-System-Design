const express = require("express");
const router = express.Router();
const { debit_wallet } = require("../controllers/debit_wallet.js");


router.post("/debit", debit_wallet);

module.exports = router;
