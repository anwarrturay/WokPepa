const express = require("express");
const router = express.Router();
const { getAllResumes, createNewResume, updateResume, deleteResume, getSpecificResume } = require("../controllers/resumeController");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list")
router.route("/")
    .get(verifyRoles(ROLES_LIST.USER), getAllResumes)
    .post(verifyRoles(ROLES_LIST.USER), createNewResume)
    .put(verifyRoles(ROLES_LIST.USER), updateResume)        
    .delete(verifyRoles(ROLES_LIST.USER), deleteResume)

router.route("/:userId")
    .get(getSpecificResume)

module.exports = router;