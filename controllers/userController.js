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

// log a user in
const postLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ user: req.user });
    } else {
        res.redirect("/users/login");
    }
}

// log a user out
const getLogout = (req, res) => {
    req.logout();
    res.redirect('/users/login');
}

// export user controllers
userController = {
    getLogin,
    getSignup,
    postLogin,
    getLogout
};
module.exports = userController;