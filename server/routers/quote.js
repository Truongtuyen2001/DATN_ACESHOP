const express = require('express');
const { createQuote, listQuote, detailQuote, IdByQuote, updateQuote , removeQuote} = require("../controllers/quote")
const router = express.Router();

router.post("/addQuote", createQuote);
router.get("/listQuote", listQuote);
router.get("/detailQuote/:idQuote", detailQuote);
router.patch("/updateQuote/:idQuote", updateQuote);
router.delete("/deleteQuote/:idQuote", removeQuote);
router.param('idQuote', IdByQuote)
module.exports = router;