var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'quocnamutc@gmail.com',
        pass: '0386055556'
    }
});

module.exports = transporter;