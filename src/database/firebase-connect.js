const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCuPNBN0IWjEDVBg5gAjooDwXnGZG2HHu4",
    authDomain: "tresmosqueteiros-9e426.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://tresmosqueteiros-9e426.firebaseio.com",
};

const app = firebase.initializeApp(config);

module.exports = app;