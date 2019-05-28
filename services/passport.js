const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const Users = mongoose.model('users');

// generating ID for Cookie
passport.serializeUser((user ,done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done)=> {
    Users.findById(id)
        .then((user) => {
            done(null, user)
        })
})
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken , profile, done) => {
    const user = await Users.findOne({ googleId: profile.id });
        if (!user) {
            const usr = await new Users({ googleId: profile.id }).save();
            done(null, usr);
        } else {
            done(null, user);
        }
    }
));
