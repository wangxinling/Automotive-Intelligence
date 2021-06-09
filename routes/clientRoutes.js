// import required modules
const express = require('express');

// import controllers
const partController = require('../controllers/clientController');

// create express router
const router = express.Router();

// part routes
router.get('/', clientController.getclients);
router.get('/form',clientController.getclientsform);

// export router handles
module.exports = router;