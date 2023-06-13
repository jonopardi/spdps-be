// Importing express module
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const proposalController = require("../controllers/proposal");
// Handling request using router
// router.get("/", proposalController.getAllProposal);

router.post("/", proposalController.createProposal);
// router.post("/createDsn", proposalController.createDsn);

// router.post('/', registerController.registerUser);
// router.post("/", proposalController.registerUser);
// Importing the router
module.exports = router;
