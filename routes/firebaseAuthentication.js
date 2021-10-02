const express = require('express');
const  router = express.Router();
const firebaseAuthenticationValidator = require('../validator/firebaseAuthentication.validator');

//get user type
router.post('/getUserType', firebaseAuthenticationValidator.getUserType);

//create new user
router.post('/createUser', firebaseAuthenticationValidator.createUserProfile);

//delete user
router.post('/deleteUser', firebaseAuthenticationValidator.deleteUserProfile);

module.exports = router;
