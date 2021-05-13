// import required modules
const bcrypt = require('bcryptjs');

// import models
const User = require('../models/userModel');

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
        res.send({ user: req.user });
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

// export user controllers
userController = {
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getLogout
};
module.exports = userController;