// Importing express module
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/auth.controller");
// Handling request using router
router.get("/", (req, res, next) => {
  res.send("This is the login request");
});

router.post("/", loginController.login);
// Importing the router
module.exports = router;
