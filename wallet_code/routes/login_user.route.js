const express = require("express");
const router = express.Router();
const { login_user } = require("../controllers/login_user.controller.js");

router.post("/login", login_user);

module.exports = router;
