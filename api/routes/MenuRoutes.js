const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuControllers')

// get all the menu items 
router.get('/', menuController.getAllMenuItem)

module.exports = router;