const express = require("express");
const router = express.Router();
const { forgotPassword } = require("../controllers/usersController");

router.post('/', forgotPassword);

module.exports = router;