// import required modules
const express = require('express');
const passport = require('passport');

// import controllers
const userController = require('../controllers/userController');

// create express router
const router = express.Router();

// user routes
router.get('/login', userController.getLogin);
router.get('/signup', userController.getSignup);
router.post('/login', passport.authenticate("local"), userController.postLogin);
router.get('/logout', userController.getLogout);

// export router handles
module.exports = router;