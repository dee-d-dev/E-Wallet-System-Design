const express = require("express");
const router = express.Router();
const {initiateTransaction} = require("../controllers/initiateTransaction.js");

router.post("/pay", initiateTransaction);


module.exports = router;
