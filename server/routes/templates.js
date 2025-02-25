const express = require("express");
const router = express.Router();
const getAllAvailableTemplates = require("../controllers/templateControler");

router.route("/").get(getAllAvailableTemplates);

module.exports = router;