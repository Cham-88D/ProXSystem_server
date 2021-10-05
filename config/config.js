const admin = require("firebase-admin");
const serviceAccount = require("../key.json");
const uuid = require('uuid-v4');

// firebase admin config
const firebaseSettings = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://procurementsystemx.appspot.com"
});

module.exports = firebaseSettings;