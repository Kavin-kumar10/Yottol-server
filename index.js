const express = require('express')
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();





app.get('/',(req,res)=>{
    res.send("I am working fine");
})

app.post('/',async (req,res)=>{
    console.log(req.body);
    await sentEmail(req.body.Email,req.body.Otp);
    res.redirect('https://kavin-kumar10.github.io/Yottol-client/#/Login/otpVerify');
})


app.listen(5000);


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILID,
        pass: process.env.PASS
    },
    tls:{
        rejectUnauthorized:false
    }
});

const sentEmail = (Email,Otp) =>{
    console.log(Email);
    let mailOptions = {
        from: process.env.MAILID,
        to: Email,
        subject: 'OTP Verification',
        text: `Your OTP is ${Otp}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
