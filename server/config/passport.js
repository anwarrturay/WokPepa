const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const User = require("../models/User");


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "http://localhost:3500/auth/google/callback"
    callbackURL: "https://wokpepa-api-service.onrender.com/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, done)=> {
    try {
      let user = await User.findOne({ googleId: profile.id });
      console.log("Found Auth User: ", user);

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          firstname: profile.name?.givenName || profile.displayName?.split(' ')[0] || "NoName",
          lastname: profile.name?.familyName || profile.displayName?.split(' ')[1] || "User",
          email: profile.emails?.[0]?.value || null,
          image: profile.photos?.[0]?.value || null,
          isGoogleUser: true,
          refreshToken
        });
      }else{
        user.refreshToken = refreshToken;
      }

      await user.save();

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
