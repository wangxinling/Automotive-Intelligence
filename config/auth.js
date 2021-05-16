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

exports.addUser = (req, user) => {
    User.findOne({ email: user.email }).then((dbUser) => {
        if (dbUser) {
            req.user = dbUser;
            req.session.passport = { user: dbUser.id };
            console.log("This user already exists");
            console.log(req.user);
            console.log(req.session);
        } else {
            dbUser = {
                name: user.name,
                email: user.email,
                password: user.id,
            };

            const newUser = new User(dbUser);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(dbUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
        
                    newUser.save().then((user) => {
                        req.user = user;
                        req.session.passport = { user: user.id };
                        console.log("User has been added to the database");
        
                        console.log(req.user);
                        console.log(req.session);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
            });
        }
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