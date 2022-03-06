const express = require("express");
const router = express.Router();
const { debit_wallet } = require("../controllers/debit_wallet.js");
const verifyToken = require("../middlewares/auth.js");


router.post("/debit", verifyToken, debit_wallet);

module.exports = router;
