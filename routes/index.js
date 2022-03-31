const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get("/issue_tracker", homeController.home);
router.use("/issue_tracker", require("./project"));

module.exports = router;
