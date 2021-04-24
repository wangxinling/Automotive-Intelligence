// import require modules
const express = require('express');
const serviceController = require('../controllers/serviceController');

// create express router
const router = express.Router();

// service routes
router.get('/', serviceController.getService);
router.post('/', serviceController.postFindService);
router.get('/add', serviceController.getAddService);
router.post('/add', serviceController.postAddService);
router.get('/:id', serviceController.getServiceDetails);

// export router handles
module.exports = router;