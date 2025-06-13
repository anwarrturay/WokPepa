const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const verifyRoles = require("../../middleware/verifyRoles")
const ROLES_LIST = require("../../config/roles_list");

router.route("/")
    .get(verifyRoles(ROLES_LIST.ADMIN), usersController.getAllUsers)
    
router.route("/:id")
    .get(verifyRoles(ROLES_LIST.USER), usersController.getSpecificUser)
    .delete(verifyRoles(ROLES_LIST.ADMIN), usersController.deleteUsers) 

// router.get("/me", verifyRoles(ROLES_LIST.USER), usersController.googleUserProfile) 
router.route('/is-new')
    .patch(verifyRoles(ROLES_LIST.USER), usersController.isNewUser);   

module.exports = router;