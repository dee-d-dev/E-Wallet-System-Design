const express = require("express");
const router = express.Router();
const create_wallet = require("../controllers/create_wallet.js");
const verifyToken = require("../middlewares/auth.js");

router.post("/create_wallet", verifyToken, create_wallet);

module.exports = router;
