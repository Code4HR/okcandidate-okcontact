"use strict";

//Twilio credentials and user phone number stored in environment variables for security.
const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILO_AUTH_TOKEN'];
const twilioNum = process.env['TWILIONUM'];
const userNum = process.env['USERNUM'];

var userName = "Marc"

var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: userNum,
    from: twilioNum,
    body: 'Twilio check addressed to ' + userName,
},  
    function (err, message){
        if (err){
            console.log("Error! ", err);
        }else{
            console.log("Message succesfully sent to ", userNum, " from ",twilioNum);
        }
    }
);