const router = require("express").Router();
const { transfer_money } = require("../controllers/transfer_money");
const verifyToken = require("../middlewares/auth");

router.post("/transfer", verifyToken, transfer_money);

module.exports = router;
