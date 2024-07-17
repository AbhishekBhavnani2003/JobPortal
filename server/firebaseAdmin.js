
const admin = require('firebase-admin');
const serviceAccount = require('./castfit-f8bea-firebase-adminsdk-la6m5-355d4ae94c.json'); // Update the path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
