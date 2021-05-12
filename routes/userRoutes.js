// import required modules
const express = require('express');

// import controllers
const userController = require('../controllers/userController');

// create express router
const router = express.Router();

// user routes
router.get('/login', userController.getLogin);
router.get('/signup', userController.getSignup);

// export router handles
module.exports = router;