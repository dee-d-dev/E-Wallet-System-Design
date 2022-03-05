const router = require("express").Router();
const { transfer_money } = require("../controllers/transfer_money");

router.get("/transfer", transfer_money);

module.exports = router;
