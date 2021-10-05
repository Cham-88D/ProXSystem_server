const firebaseAuthenticationModel = require('../models/firebaseAuthentication.model');


// get user controller
exports.getUserType =  async (req, res)=> {
    await firebaseAuthenticationModel.getUserType(req.params.id, function (error, result) {
        if (error) {
            res.send(error);
        } else {
            res.status(200).send(result);
        }
    });
};

// create user controller
exports.createUserProfile =  async(req, res)=> {
    await firebaseAuthenticationModel.createUserProfile(req.body, function (error, result) {
        if (error) {
            res.send(error);
        } else {
            res.status(200).send(result);
        }
    });
};


// delete user controller
exports.deleteUserProfile =  async (req, res)=> {
    await firebaseAuthenticationModel.deleteUserProfile(req.body.uid, function (error, result) {
        if (error) {
            res.send(error);
        } else {
            res.status(200).send(result);
        }
    });
};

