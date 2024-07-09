const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuControllers')

// get all the menu items 
router.get('/', menuController.getAllMenuItem)
router.get('/:id', menuController.singleItem)
router.post('/', menuController.postMenuItem)
router.delete('/:id',menuController.deleteMenuItem),
router.patch('/:id',menuController.updateSingleItem)

module.exports = router;