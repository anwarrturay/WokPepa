const express = require("express");
const router =  express.Router();
const usersController = require("../../controllers/usersController")
const verifyJWT = require("../../middleware/verifyJWT");
const upload = require("../../middleware/multerConfig");

router.patch("/:id", verifyJWT, upload.single("image"),  usersController.updateUserDetails);

module.exports = router;