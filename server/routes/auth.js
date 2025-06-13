const express = require("express");
const router = express.Router();
const {handleLogin, oAuthLogin} = require("../controllers/AuthController");
const resetPassword = require("../controllers/resetPasswordController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/", handleLogin);
router.post("/:token", handleLogin);
router.post("/reset-password/:token", resetPassword)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], accessType: 'offline', prompt: 'consent' })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}`,
    session: true,
  }),
  oAuthLogin
);

module.exports = router;
