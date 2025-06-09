const express = require("express");
const router = express.Router();
const { 
    getAllResumes, 
    createNewResume, 
    updateResume, 
    deleteResume, 
    getUserResumes,
    savedResume
} = require("../controllers/resumeController");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
const upload = require("../middleware/multerConfig");
router.route("/")
    .get(verifyRoles(ROLES_LIST.USER), getAllResumes)
router.route("/:id")
    .post(upload.single("image"), verifyRoles(ROLES_LIST.USER), createNewResume)
    .delete(verifyRoles(ROLES_LIST.USER), deleteResume)
    .patch(verifyRoles(ROLES_LIST.USER), updateResume)        
router.post("/my-resumes/:id", upload.single("image"), verifyRoles(ROLES_LIST.USER), savedResume);
router.route("/user-pdfs/:id").get(verifyRoles(ROLES_LIST.USER), getUserResumes);

module.exports = router;