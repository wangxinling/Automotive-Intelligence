// import required modules
const express = require('express');

// import controllers
const toolController = require('../controllers/toolController');

// create express router
const router = express.Router();

// tool routes
router.get('/add', toolController.getAddTool);
router.get('/find', toolController.getFindTool);
router.get('/', toolController.getAllTools);
router.post('/', toolController.postAddTool);
router.post('/find', toolController.postFindTool);
router.get('/:id', toolController.getTool);
router.delete('/:id', toolController.deleteTool);

// every minuter check one time all tools' location
setInterval(toolController.getUsage, 60000);

// export router handles
module.exports = router;