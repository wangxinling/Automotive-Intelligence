// import require modules
const express = require('express');
const toolController = require('../controllers/toolController');

// create express router
const router = express.Router();

// tool routes
router.get('/add', toolController.getAddTool);
router.get('/', toolController.getAllTools);
router.post('/', toolController.postAddTool);
router.get('/:id', toolController.getTool);
router.delete('/:id', toolController.deleteTool);

// export router handles
module.exports = router;