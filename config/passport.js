const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value
    };

    try {
      // Check if user already exists
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        // User exists, return them
        return done(null, user);
      } else {
        // New user, create and save to database
        user = await User.create(newUser);
        return done(null, user);
      }
    } catch (err) {
      console.error('Error in Google Strategy:', err);
      return done(err, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
