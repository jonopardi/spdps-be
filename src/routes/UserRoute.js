// Importing express module
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
// Handling request using router
const userSchema = {
  id_pemesan: String,
  tanggal: String,
  jam_mulai: String,
  jam_selesai: String,
  keperluan: String,
};

router.get("/", usersController.getAllUsers);
// Importing the router
module.exports = router;
