// import required modules
const jwt = require('jsonwebtoken');

// import models
const User = require('../models/userModel');

//import configs
const authConfig = require('../config/auth');
const mailConfig = require('../config/mail');

/// user controllers
// get user login page
const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        const redirect = req.flash('redirect');
        res.render('login', { title: 'Login', redirect });
    }
}

// redirect user login fail
const getLoginFail = (req, res) => {
    req.flash("redirect", "login");
    res.redirect('/users/login');
}

// get user signup page
const getSignup = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        const exist = req.flash('exist');
        res.render('signup', { title: 'Register', exist });
    }
}

// log in a user
const postLogin = (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        console.log(req.session);
        res.redirect("/");
    } else {
        res.redirect("/users/login");
    }
}

// register a user
const postSignup = async (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email }).then(async (user) => {
        if (user) {
            req.flash("exist", "exist");
            res.redirect("/users/signup");
        } else {
            user = {
                name,
                email,
                password,
            }
            
            const newUser = await new User(user);

            const token = jwt.sign({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password
            }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            await mailConfig.sendMail(token);

            req.flash("redirect", "signup");
            res.redirect("/users/login");
        }
    });
}

// verify user email
const getConfirmSignup = (req, res) => {
    const user = jwt.verify(req.params.token, process.env.JWT_SECRET);
    
    // adding local user to the database
    authConfig.addLocalUser(user);

    res.redirect("/users/login");
}

// authenticate social network user
const postSocialLogin = async (req, res, next) => {
    try {
        let profile, id = null;
        const code = req.query.code;

        if (req.route.path.split("/")[2] === "google") {
            profile = await authConfig.getGoogleProfile(code);
            id = profile.sub;
        } else {
            profile = await authConfig.getFacebookProfile(code);
            id = profile.id;
        }
        
        const user = {
            id: id,
            name: profile.name,
            email: profile.email
        }

        // adding social network user to the database
        authConfig.addSocialUser(req, res, next, user);
    } catch (err) {
        console.log(err);
        res.status(401).send();
    }
}

// log out a user
const getLogout = (req, res) => {
    req.logout();
    res.redirect('/users/login');
}

// export user controllers
userController = {
    getLogin,
    getLoginFail,
    getSignup,
    postLogin,
    postSignup,
    getConfirmSignup,
    postSocialLogin,
    getLogout
}
module.exports = userController;