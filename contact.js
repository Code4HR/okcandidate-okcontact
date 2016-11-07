'use strict';

/**************************************************
Import credentials, phone numbers, and mail domains
**************************************************/
const accountSid = process.env['OKC_TWILIO_ACCOUNT_SID'];
const authToken = process.env['OKC_TWILO_AUTH_TOKEN'];
const twilioNum = process.env['OKC_TWILIONUM'];

const api_key = process.env['OKC_MAILGUN_SECRET_API'];
const domain = process.env['OKC_MAILGUN_DOMAIN'];
const from_who = process.env['OKC_MAILGUN_FROM_ADDRESS'];

/**********************************************
Import node modules and mockDB used for testing
**********************************************/
const Mailgun = require('mailgun-js');
const client = require('twilio')(accountSid, authToken);
const userDatabase = require('./mockDB.js');

scanUsersAndContact(userDatabase.users);

/*******************
Function Definitions
*******************/

function scanUsersAndContact(database) {
    /**************************************************************************
    Iterates over the database to see if users have requested a reminder email,
    SMS, both, or neither.
    **************************************************************************/
    for (let i = 0; i < database.length; i++){
        if (database[i].userPhone){
            sendSMS(database[i]);
        }
        if (database[i].userEmail){
            sendEmail(database[i]);
        }
    }
}

function sendEmail(surveyor) {
    let mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var data = {
        from: from_who,
        to: surveyor.userEmail,
        subject: 'Vote For Your OKCandidates Tomorrow!',
        html: 'Greetings!  You are receiving this email because you asked for a reminder when you took the OKCandidate survey.  The election is tomorrow, so make sure you cast your vote!  <a href="http://okcandidate.code4hr.org/votercard/' + surveyor.id + '">If you would like to review your survey results, click here</a>.  Thanks for doing your part! '
    };
    mailgun.messages().send(data, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('\nSuccess: emailed userId:', surveyor.id,
                ' at ', surveyor.userEmail);
        }
    });
}

function sendSMS(surveyor) {
    //Raw 10-digit phone number which may have non-digits in it.
    var rawUserNumber = surveyor.userPhone;

    //Converted into +12345678901 format for Twilio
    var formattedUserNumber = "+1".concat(rawUserNumber.replace(/[^\d]/g,''))

    client.messages.create({
        to: formattedUserNumber,
        from: twilioNum,
        body: 'This is your reminder to vote tomorrow!  Go to http://okcandidate.code4hr.org/votercard/' + surveyor.id + ' to review your survey results.'
    },
        function (err) {
            if (err) {
                console.log('\nError! ', err);
            }
            else {
                console.log('\nSuccess: txted userId:', surveyor.id,
                    ' at ', formattedUserNumber);
            }
        }
    );
}
