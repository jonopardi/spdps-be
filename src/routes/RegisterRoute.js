// Importing express module
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const registerController = require("../controllers/auth.controller");
const createUserController = require("../controllers/createUser");
// Handling request using router
router.get("/", registerController.getAllUser);

router.post("/createMhs", createUserController.createMhs);
router.post("/createDsn", createUserController.createDsn);

// router.post('/', registerController.registerUser);
router.post("/", registerController.registerUser);
// Importing the router
module.exports = router;
