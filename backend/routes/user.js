
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET REQUESTS

// get a specific users
// api/v1/users/:userId
router.get('/:userId', userController.getUserById);

//POST REQUESTS

// create a new user record
// api/v1/users/addNewScholar
router.post('/register', userController.addNewUser)

// PUT REQUESTS

// change user info
// api/v1/users/:userId
router.put('/:userId', userController.changeUserInfo);

// change user password
// api/v1/users/:userId/password
router.put('/:userId/password', userController.changePassword);


// DELETE REQUEST

// soft delete user by id
// api/v1/users/:userId
router.delete( '/:userId', userController.deleteAUser);

module.exports = router;