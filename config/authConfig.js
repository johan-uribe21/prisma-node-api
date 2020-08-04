require("dotenv").config();

let GoogleStrategy = require("passport-google-oauth20").Strategy;
let passport = require("passport");
const userCRUD = require("../controllers/user/user.crud");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await userCRUD.findOrCreateUser(profile, accessToken);
        return cb(null, user);
      } catch (err) {
        return cb(err, false);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await userCRUD.readById(id);
    cb(null, user);
  } catch (err) {
    cb(err, false);
  }
});

module.exports = passport;
