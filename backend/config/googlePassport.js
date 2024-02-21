// Define Google OAuth Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel.js');
const generateToken = require("./generateToken.js");
const crypto = require('crypto');
const generateRandomPassword = require("./randomPassword.js");

const keys = {
    google: {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: 'http://localhost:5173/chats'
    }
}

exports.initializingGoogleStrategy = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callbackURL
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists in database
                let user = await User.findOne({ email: profile.emails[0].value });
                if (user) {
                    // User already exists, return user
                    done(null, user);
                } else {
                    // User doesn't exist, create new user
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        pic: profile.photos[0].value,
                        password: generateRandomPassword() 
                    });

                    await user.save();

                    // Generate token
                    const token = generateToken(user._id);

                    // Return user and token
                    done(null, { user, token });
                }
            } catch (error) {
                done(error, false);
            }
        }));

    // Serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(error => {
                done(error, null);
            });
    });
}