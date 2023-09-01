/** @format */

import passport from "passport";
import { Environment } from "../env/Environment";

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: Environment.CLIENT_ID,
      clientSecret: Environment.CALLBACKURL,
      callbackURL: Environment.CALLBACKURL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
