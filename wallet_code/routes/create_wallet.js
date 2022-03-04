const express = require("express");
const router = express.Router();
const create_wallet = require("../controllers/create_wallet.js");

router.post("/create_wallet", create_wallet);

module.exports = router;
