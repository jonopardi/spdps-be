// Importing express module
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
// Handling request using router
router.get("/", (req, res, next) => {
  res.send("This is the login request");
});

router.post("/requestResetPassword", authController.requestResetPassword);
// Importing the router
module.exports = router;
