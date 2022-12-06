const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cron = require('node-cron');






var server = app.listen(3000, () => {
    console.log("start");
})
app.get('/sendmail', (req, res) => {
    response1 = {
        semail: req.query.semail,
        password: req.query.password,
        remail: req.query.remail,
        subject: req.query.subject,
        message: req.query.message,
        crons: req.query.crons
    };
    console.log(response1);
    const mailOptions = {
        from: response1.semail,
        to: response1.remail,
        subject: response1.subject,
        text: response1.message
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: response1.semail,
            pass: response1.password
        }
    })

    function sendMail() {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email send' + info);      
            }    
        })
    }
    var cron2 = "" + response1.crons + "";
    console.log(cron2);
    cron.schedule(cron2, function() {
        console.log("running a task every 10 second");
        sendMail();
    });
    // res.send("hello");

});