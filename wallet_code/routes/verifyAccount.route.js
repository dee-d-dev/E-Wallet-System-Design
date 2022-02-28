const express = require("express");
const router = express.Router();
const { verifyAccount } = require("../controllers/verifyAccount.js");

router.get("/verifyAccount", verifyAccount);

module.exports = router;
