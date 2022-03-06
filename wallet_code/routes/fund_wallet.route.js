const express = require("express");
const router = express.Router();
const { fund_wallet } = require("../controllers/fund_wallet.js");
const verifyToken = require("../middlewares/auth.js");


router.post("/credit_wallet",verifyToken, fund_wallet);

module.exports = router;
