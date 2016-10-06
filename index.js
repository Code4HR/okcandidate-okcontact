"use strict";

//Twilio credentials stored in a separate file for git security
//const auth = require('./auth.js');

const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILO_AUTH_TOKEN'];
const twilioNum = process.env['TWILIONUM'];
const userNum = process.env['USERNUM'];

//require the Twilio module and create a REST client
//const client = require('twilio')(accountSid, authToken);
var client = require('twilio')(accountSid, authToken);
client.messages.create({
    to: userNum,
    from: twilioNum,
    body: 'Twilio check with environment variables',
}, function (err, message){
    if (err){
        console.log("Error!  Err: ", err, " Message.sid: ", message.sid);
    }else{
        console.log("Message succesfully sent to ", userNum, " from ",twilioNum);
    }
});