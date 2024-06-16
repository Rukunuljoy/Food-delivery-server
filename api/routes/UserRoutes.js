const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, userController.getAllUsers)
router.post('/', verifyToken, userController.createUser)
router.delete('/:id', verifyToken, userController.deleteUser)
router.get('/admin/:email',verifyToken, userController.getAdmin) 
router.patch('/admin/:id', verifyToken, userController.makeAdmin) 

module.exports =router;
