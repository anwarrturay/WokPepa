const express = require("express");
const router = express.Router();
const reportEmail = require("../../controllers/reportEmailController");
const verifyRoles = require("../../middleware/verifyRoles")
const ROLES_LIST = require("../../config/roles_list");

router.post("/:id", verifyRoles(ROLES_LIST.USER), reportEmail)

module.exports = router;