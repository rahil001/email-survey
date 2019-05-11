const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
}, (accessToken, refreshToken , profile, done) => {
    Users.findOne({ googleId: profile.id }).then((user) => {
        if (!user) {
            new Users({
                googleId: profile.id
            })
            .save()
            .then((usr) => done(null, usr));
        } else {
            done(null, user);
        }
    });
}));

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientId,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken , profile, done) => {
    Users.findOne({ facebookId: profile.id }).then((user) => {
        if (!user) {
            new Users({
                facebookId: profile.id
            })
            .save()
            .then((usr) => done(null, usr));
        } else {
            done(null, user);
        }
    });
}));