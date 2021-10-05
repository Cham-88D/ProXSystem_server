const express = require('express');
const  router = express.Router();
const firebaseAuthenticationValidator = require('../validator/firebaseAuthentication.validator');

//get user type
router.post('/user/:id', firebaseAuthenticationValidator.getUserType);

//create new user
router.post('/user', firebaseAuthenticationValidator.createUserProfile);

//delete user
router.delete('/user/:id', firebaseAuthenticationValidator.deleteUserProfile);

module.exports = router;
