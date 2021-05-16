// import required modules
const bcrypt = require('bcryptjs');

// import models
const User = require('../models/userModel');

//import configs
const authConfig = require('../config/auth');

/// user controllers
// get user login page
const getLogin = (req, res) => {
    res.render('login', { title: 'Login' });
}

// get user signup page
const getSignup = (req, res) => {
    res.render('signup', { title: 'Register' });
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
          res.send({ errors: ["Email already exists"] });
        } else {
            user = {
                name,
                email,
                password,
            };
            
            const newUser = new User(user);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser.save().then((user) => {
                        console.log("User has been added to the database");
                    }).catch((err) => {
                        console.log(err)
                    });
                });
            });
        }
    });

    res.redirect("/users/login");
}

// log out a user
const getLogout = (req, res) => {
    req.logout();
    res.redirect('/users/login');
}

// authenticate google user
const postGoogleLogin = async (req, res) => {
    try {
        const code = req.query.code;
        const profile = await authConfig.getGoogleProfile(code);
        const user = {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
        };
        console.log(profile);
        // adding google user to the database
        authConfig.addUser(req, user);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(401).send();
    }
}

// authenticate facebook user
const postFacebookLogin = async (req, res) => {
    try {
        const code = req.query.code;
        const profile = await authConfig.getFacebookProfile(code);
        const user = {
            id: profile.id,
            name: profile.name,
            email: profile.email
        };
    
        // adding facebook user to the database
        authConfig.addUser(req, user);
        res.redirect("/");
      } catch (err) {
        console.log(err);
        res.status(401).send();
      }
}

// export user controllers
userController = {
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getLogout,
    postGoogleLogin,
    postFacebookLogin
}
module.exports = userController;