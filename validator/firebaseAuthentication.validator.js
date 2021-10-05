const Joi = require('joi').extend(require("joi-phone-number"));
const firebaseAuthenticationController = require('../controllers/firebaseAuthentication.controller');


// get user type validation
exports.getUserType = async (req, res) => {
    let data = req.body;
    const schema = Joi.object({
        uid: Joi.string().min(3).max(50).required()
    });
    const {error} =  schema.validate(data);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
    } else {
        await firebaseAuthenticationController.getUserType(req, res);
    }
};

//create user validation
exports.createUserProfile = async(req, res) => {
    let data = req.body;
    const schema = Joi.object({
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }).required(),
        password: Joi.string().min(7).max(50).required(),
        phoneNumber: Joi.string().phoneNumber().length(12),
        role:Joi.string().min(3).max(10).required(),
        fileName:Joi.string().min(4),
        name:Joi.string().min(5)
    });
    const {error} =  schema.validate(data);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
    } else {
        await firebaseAuthenticationController.createUserProfile(req, res);
    }
};

//delete user validation
exports.deleteUserProfile = async (req, res) => {
    let data = req.body;
    const schema = Joi.object({
        uid: Joi.string().min(3).max(50).required()
    });
    const {error} =  schema.validate(data);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
    } else {
        await firebaseAuthenticationController.deleteUserProfile(req, res);
    }    
};



