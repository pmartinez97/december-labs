const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const transferController = require("../controllers/transfer.controller");
const Validator = require("../middleware/validator");
const router = express.Router();

router.get( "/transactions", Validator('transaction'), transactionController.getAll );
router.post( "/transfers", Validator('transfer'), transferController.create );

module.exports = router;