// import required modules
const express = require('express');

// import controllers
const serviceController = require('../controllers/serviceController');
const clientController = require('../controllers/clientController');

// create express router
const router = express.Router();

// service routes
router.get('/', serviceController.getAllService);
router.get('/add', serviceController.getAddService);
router.get('/find', serviceController.getFindService);
router.post('/add', serviceController.postAddService);
router.post('/find', serviceController.postFindService);
router.get('/:id', serviceController.getServiceDetails);
router.delete('/:id', serviceController.deleteService);

router.get('/update/:id', serviceController.getUpdateServicePage);
router.post('/update/:id', serviceController.updateServiceDetails);

router.get('/rego/:id',clientController.getRegoNumberInfor);

// export router handles
module.exports = router;