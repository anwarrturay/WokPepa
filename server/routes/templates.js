const express = require("express");
const router = express.Router();
const getAllAvailableTemplates = require("../controllers/templateControler");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
router.route("/").get(verifyRoles(ROLES_LIST.USER), getAllAvailableTemplates);

module.exports = router;