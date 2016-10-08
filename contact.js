"use strict";

/**************************************************
Import credentials, phone numbers, and mail domains
**************************************************/
const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILO_AUTH_TOKEN'];
const api_key = process.env['MAILGUN_SECRET_API'];
const twilioNum = process.env['TWILIONUM'];
const domain = process.env['MAILGUN_DOMAIN']
const from_who = process.env['MAILGUN_FROM_ADDRESS']

/**********************************************
Import node modules and mockDB used for testing
**********************************************/
const Mailgun = require('mailgun-js');
const client = require('twilio')(accountSid, authToken);
const userDatabase = require('./mockDB.js');  

scanUsersAndContact(userDatabase.users);

/********************
Functions definitions
********************/
function scanUsersAndContact(database){
    /**************************************************************************
    Iterates over the database to see if users have requested a reminder email,
    SMS, both, or neither.
    **************************************************************************/    
    for (let i = 0; i < database.length; i++){
        if (database[i].notifyByPhone){
            sendSMS(database[i]);
        }
        if (database[i].notifyByEmail){
            sendEmail(database[i]);
        }
    } 
}

function sendEmail(surveyor) {
    let mailgun = new Mailgun({apiKey: api_key, domain: domain});
    
    var data = {
        from: from_who,
        to: surveyor.userEmail,
        subject: 'Vote for your candidate on Tuesday! ',
        html: 'Greetings, ' + surveyor.userName + '!  You are receiving this email because you asked for a reminder when you took the OK-Candidate Survey.  The election is next Tuesday, so don\'t forget to vote.  If you would like to review your survey results, you can <a href="http://google.com/#' + surveyor.userId + '">Click here</a>.  Thanks for doing your part in democracy.  '
    };

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("\nSuccess: emailed userId:", surveyor.userId, 
                " at ", surveyor.userEmail);
        }
    });  
}

function sendSMS(surveyor){
    client.messages.create({
        to: surveyor.userPhone,
        from: twilioNum,
        body: 'This is your reminder to vote Tuesday.  Go to www.google.com/#'+ surveyor.userId + ' to review your survey results.' + surveyor.userName
    },  
        function (err, message){
            if (err){
                console.log("\nError! ", err);
            }else{
                console.log("\nSuccess: txted userId:", surveyor.userId, 
                    " at ", surveyor.userPhone);
            }
        }
    );
}