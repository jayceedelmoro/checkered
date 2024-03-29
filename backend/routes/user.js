
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET REQUESTS

// get all users
// api/v1/users/
router.get('/', userController.getAllUser);

// get a specific user
// api/v1/users/:id
router.get('/:id', userController.getUserById);

//POST REQUESTS

// create a new user record
// api/v1/users/register
router.post('/register', userController.addNewUser)

// logs in the user
// api/v1/users/login
router.post('/login', userController.login)

// PUT REQUESTS

// change user info
// api/v1/users/:id
router.put('/:id', userController.changeUserInfo);

// change user password
// api/v1/users/:id/password
router.put('/:id/password', userController.changePassword);


// DELETE REQUEST

// soft delete user by id
// api/v1/users/:id
router.delete( '/:id', userController.deleteAUser);

module.exports = router;