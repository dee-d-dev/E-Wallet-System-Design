const express = require("express");
const router = express.Router();
const {
  transferRecipient
} = require("../controllers/transferRecipient.js");

router.post("/transferrecipient", transferRecipient);

module.exports = router;
