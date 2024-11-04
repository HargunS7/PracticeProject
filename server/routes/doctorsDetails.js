const express = require("express");
const { registerDoctor } = require("../controllers/doctorsDetailsController");

const router = express.Router();

router.post("/register", registerDoctor);

module.exports = router;