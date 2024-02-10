const router = require('express').Router();
const userController = require('../controllers/userController');


router.post('/login', userController.loginUser);

router.post('/register', userController.registerUser);

router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;