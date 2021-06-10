// import required modules
const fetch = require('node-fetch');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { URL, URLSearchParams } = require('url');

// import models
const User = require('../models/userModel');

// dotenv for storing static censored data
require("dotenv").config();

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://localhost/users/auth/google'
);

const getUserData = async (accessToken) => {
    const urlFetchData = new URL(`https://graph.facebook.com/me`);

    const params = {
        fields: "name,email",
        access_token: accessToken
    }

    urlFetchData.search = new URLSearchParams(params).toString();

    const userData = await fetch(urlFetchData, {
        method: 'GET'
    }).then((res) => {
        return res.json();
    }).then((userData) => {
        return userData;
    }).catch((err) => {
        console.log(err);
        return err;
    });

    return userData;
}

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/users/login');
}

exports.addLocalUser = (user) => {
    const newUser = new User(user);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser.save().then((user) => {
                console.log("User has been added to the database");
            }).catch((err) => {
                console.log(err);
            });
        });
    });
}

exports.addSocialUser = (req, res, next, user) => {
    User.findOne({ email: user.email }).then((dbUser) => {
        if (dbUser) {
            req.login(dbUser, (err) => {
                if(err) return next(err);
                res.redirect("/");
            });

            console.log("This user already exists");
        } else {
            dbUser = {
                name: user.name,
                email: user.email,
                password: user.id
            }

            const newUser = new User(dbUser);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(dbUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
        
                    newUser.save().then((user) => {
                        req.login(user, (err) => {
                            if(err) return next(err);
                            res.redirect("/");
                        });
                        
                        console.log("User has been added to the database");
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });
        }
        console.log(req.user);
        console.log(req.session);
    });
}

exports.getGoogleProfile = async (code) => {
    const authToken = await client.getToken(code);
    const idToken = authToken.tokens.id_token;

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return payload;
}

exports.getFacebookProfile = async (code) => {
    const urlFetchToken = new URL('https://graph.facebook.com/oauth/access_token');

    const params = {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        redirect_uri: "https://localhost/users/auth/facebook",
        code: code
    };

    urlFetchToken.search = new URLSearchParams(params).toString();

    const profile = await fetch(urlFetchToken, {
        method: 'GET'
    }).then((res) => {
        return res.json();
    }).then((token) => {
        const userData = getUserData(token.access_token);
        return userData;
    }).catch((err) => {
        console.log(err);
        return err;
    });

    return profile;
}