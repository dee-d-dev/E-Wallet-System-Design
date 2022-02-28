const express = require("express");
const router = express.Router();
const { finalizeTransfer } = require("../controllers/finalizeTransfer.js");

router.post("/finalizeTransfer", finalizeTransfer);

module.exports = router;
