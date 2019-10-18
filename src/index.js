const dotenv   = require('dotenv');
const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exceptionHandler = require('./middlewares/exceptionHandler');
const firebase = require('firebase-admin');
const mailTransporter = require('./helper/mail');

const app = express();

dotenv.config();


var serviceAccount = require("../btl-news-firebase-adminsdk-f3c66-3fe46bfe92.json");

var firebaseApp = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://btl-news.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref('demo');

//GET DATA FROM DATABASE
// ref.on("value", function(snapshot) {
//     console.log(snapshot.val());
// }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });

// Retrieve new posts as they are added to our database
ref.on("child_added", function(snapshot, prevChildKey) {
    var user = snapshot.val();

    var mailOptions = {
        from: 'quocnamutc@gmail.com',
        to: user.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    mailTransporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

app.use('/', (req, res) => {
    res.send("a")
});

// app.use(exceptionHandler.handleException);

app.listen(process.env.PORT || 3000);