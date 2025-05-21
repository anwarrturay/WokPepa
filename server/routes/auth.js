const express = require("express");
const router = express.Router();
const handleLogin = require("../controllers/AuthController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/", handleLogin);
router.post("/:token", handleLogin);

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
  (req, res) => {
    const user = req.user;
    const roles = Object.values(user.roles).filter(Boolean);
    const accessToken = jwt.sign(
        {
            UserInfo:{
                id: user._id,
                email: user.email,
                roles: roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5h"}
    )

    res.redirect(`${process.env.CLIENT_URL}/oauth-redirect?accessToken=${accessToken}`);
    // Or res.json({ token });
  }
);

module.exports = router;
