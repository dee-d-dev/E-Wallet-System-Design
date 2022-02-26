const express = require("express");
const router = express.Router();
const payment = require("../controllers/payment.controller.js");

router.get("/pay", payment);

module.exports = router;
