const express = require("express");
const router = express.Router();
const {
  transferRecipient
} = require("../controllers/txRecipient.js");

router.post("/txrecipient", transferRecipient);

module.exports = router;
