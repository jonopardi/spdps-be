// Importing express module
const express = require("express");
const router = express.Router();
const minatController = require("../controllers/minat");
// Handling request using router
router.get("/", minatController.getMinat);

router.post("/", minatController.addMinat);
router.delete("/:_id", minatController.deleteMinat);
router.put("/:_id", minatController.updateOneMinat);
// Importing the router
module.exports = router;
