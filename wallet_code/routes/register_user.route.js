const express = require("express");
const router = express.Router();
const register_user = require("../controllers/register_user.controller.js");

router.post("/register", register_user);

module.exports = router;
