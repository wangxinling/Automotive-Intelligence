// import required modules
const express = require('express');


// import controllers
const nfcController = require('../controllers/nfcController');

// create express router
const router = express.Router();

// user auth routes
router.get('/', nfcController.getNFCManager);
router.get('/getTag', nfcController.getTagdata);
router.get('/setTag/:id', nfcController.setTagdata);
// export router handles
module.exports = router;