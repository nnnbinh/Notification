var admin = require("firebase-admin");

//thay file firebase sdk
const serviceAccount = require("./firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.notiConfig = admin;
