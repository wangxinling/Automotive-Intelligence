// import require modules
const express = require('express');
const partController = require('../controllers/partController');

// create express router
const router = express.Router();

// part routes
router.get('/add', partController.getAddPart);
router.get('/find', partController.getFindPart);
router.get('/', partController.getAllParts);
router.post('/', partController.postAddPart);
router.post('/find', partController.postFindPart);
router.get('/:id', partController.getPart);
router.delete('/:id', partController.deletePart);

// export router handles
module.exports = router;