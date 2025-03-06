const express = require("express");
const router = express.Router();
const {getAllAvailableTemplates, getSpecificTemplate } = require("../controllers/templateControler");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
router.route("/").
    get(verifyRoles(ROLES_LIST.USER), getAllAvailableTemplates);

router.route("/:id").get(verifyRoles(ROLES_LIST.USER), getSpecificTemplate);

module.exports = router;