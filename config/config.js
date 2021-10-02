const admin = require("firebase-admin");
const serviceAccount = require("../key.json");

// firebase admin config
const firebaseSettings = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = firebaseSettings;