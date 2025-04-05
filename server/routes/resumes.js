const express = require("express");
const router = express.Router();
const { 
    getAllResumes, 
    createNewResume, 
    updateResume, 
    deleteResume, 
    getSpecificResume, 
    // generateResumePDF 
} = require("../controllers/resumeController");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
const upload = require("../middleware/multerConfig");
router.route("/")
    .get(verifyRoles(ROLES_LIST.USER), getAllResumes)
    .put(verifyRoles(ROLES_LIST.USER), updateResume)        
    .delete(verifyRoles(ROLES_LIST.USER), deleteResume);
router.post("/:id", upload.single("image"), verifyRoles(ROLES_LIST.USER), createNewResume)
router.route("/:id/pdf").get(verifyRoles(ROLES_LIST.USER), getSpecificResume)
// router.route("/:userId")
//     .get(getSpecificResume)

module.exports = router;