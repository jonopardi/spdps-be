// Importing express module
const express = require("express");
const router = express.Router();
const editUserController = require("../controllers/editUser");
// Handling request using router

router.put("/mhs/:_id", editUserController.updateOneMhs);
// Importing the router
module.exports = router;
