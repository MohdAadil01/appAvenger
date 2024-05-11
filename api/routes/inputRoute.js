const express = require("express");
const router = express.Router();
const inputController = require("../controller/inputController");

router.post("/autosave", inputController.autosaveInput);

module.exports = router;
