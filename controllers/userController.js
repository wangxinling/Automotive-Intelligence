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

// export tool controllers
userController = {
    getLogin,
    getSignup
};
module.exports = userController;