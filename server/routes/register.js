const express = require("express");
const router = express.Router();
const registerNewUser = require("../controllers/registerController");
const upload = require("../middleware/multerConfig");
const passport = require("passport");

router.post('/', upload.single("image"), registerNewUser);

module.exports = router;