const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const transferController = require("../controllers/transfer.controller");
const auth = require("../middleware/auth")
const router = express.Router();

router.get( "/transactions", transactionController.getAll );
router.post( "/transfers", auth ,transferController.create );

module.exports = router;