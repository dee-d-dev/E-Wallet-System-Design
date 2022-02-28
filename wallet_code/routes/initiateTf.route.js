const express = require("express");
const router = express.Router();
const { initiateTransfer } = require("../controllers/initiateTransfer.js");

router.post("/pay", initiateTransfer);

module.exports = router;
