"use strict";

//Twilio credentials and phone number stored in environment variables for security.
const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILO_AUTH_TOKEN'];
const twilioNum = process.env['TWILIONUM'];

const client = require('twilio')(accountSid, authToken);
const mockDB = require('./mockDB.js');


for (let i=0; i < mockDB.users.length; i++){
    sendSMS(mockDB.users[i]);
}

function sendSMS(surveyor){
    client.messages.create({
        to: surveyor.userPhone,
        from: twilioNum,
        body: 'Twilio check addressed to ' + surveyor.userName,
    },  
        function (err, message){
            if (err){
                console.log("Error! ", err);
            }else{
                console.log("Message succesfully sent to ", surveyor.userPhone, " from ",twilioNum);
            }
        }
    );
}