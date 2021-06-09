// import required modules
const bcrypt = require('bcryptjs');

// import models
const User = require('../models/userModel');

//import configs
const authConfig = require('../config/auth');

/// user controllers
// get user login page
const getLogin = (req, res) => {
    const redirect = req.flash('redirect');
    res.render('login', { title: 'Login', redirect });
}

// redirect user login fail
const getLoginFail = (req, res) => {
    req.flash("redirect", "login");
    res.redirect('/users/login');
}

// get user signup page
const getSignup = (req, res) => {
    const exist = req.flash('exist');
    res.render('signup', { title: 'Register', exist });
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
const postSignup = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
        if (user) {
            req.flash("exist", "exist");
            res.redirect("/users/signup");
        } else {
            user = {
                name,
                email,
                password,
            }
            
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

            req.flash("redirect", "signup");
            res.redirect("/users/login");
        }
    });
}

// log out a user
const getLogout = (req, res) => {
    req.logout();
    res.redirect('/users/login');
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
        authConfig.addUser(req, res, next, user);
    } catch (err) {
        console.log(err);
        res.status(401).send();
    }
}

// export user controllers
userController = {
    getLogin,
    getLoginFail,
    getSignup,
    postLogin,
    postSignup,
    getLogout,
    postSocialLogin
}
module.exports = userController;