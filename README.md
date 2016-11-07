# okcandidate-okcontact

[OK Candidate](https://www.github.com/Code4HR/okcandidate) is a web app for matching voters with candidates for local offices.  [OK Candidate](https://www.github.com/Code4HR/okcandidate) is being developed by [Code For Hampton Roads](https://www.github.com/Code4HR), a local [Code For America Bridge](http://brigade.codeforamerica.com/brigade/). 


When [OK Candidate](https://www.github.com/Code4HR/okcandidate) users take the survey to match them with the politician who best aligns with their views, they are given the option of receiving a notification a few days before the election.  Users have the opportunity to opt in for a reminder e-mail, SMS message, or both.  OKContact will be the program to notify these users, and provide them with a link to their survey results.

## Configuration
To make use of [OK Candidate](https://www.github.com/Code4HR/okcandidate) you will need a [Twillio](https://www.twilio.com) and a [Mailgun](https://www.mailgun.com) account.  Both services provide quality instruction for configuring your account.  Information from your account will need to be used as follows:

### Constants
* `accountSid` - Your [Twilio Account Sid](https://www.twilio.com/console) located on your Twilio Dashboard / Account Summary.

* `authToken` - Your [Twilio Authorization Token](https://www.twilio.com/console) also located on your Twilio Dashboard / Account Summary.

* `twilioNum` - The [phone number provided by Twilio](https://www.twilio.com/console/phone-numbers/incoming) formatted as `+12345678901` (Country code, Area code, Number).

* `api_key` - Your [Mailgun Secret API Key](https://mailgun.com/app/dashboard) located on your Mailgun dashboard.  It will start with `key-` and continue with the rest of the alphanumeric characters.

* `domain` - Your configured [Mailgun Sending Domain](https://mailgun.com/app/dashboard).  It will likely looking something like `mg.example.com`.

* `from_who` - Your displayed outgoing e-mail address.  The domain will be your configured [Mailgun Sending Domain](https://mailgun.com/app/dashboard).  Example: `Mailgun@mg.example.com` or `OKC@mg.example.com`.  

* `userDatabase` - Point this to your list of users/surveyors.  The database this is currently reading from is set up as an array of objects, with each user being assigned to their own unique object.  If you are using a different schema you will likely need to rewrite `scanUsersAndContact()` to properly iterate over your database.  An example of the used database is below.

`var users = [
    {
        id:1,
        "surveyId":1,
        "userEmail":"user1email@example.com",
        "userPhone":"###-###-####" 
    },
    {
        id:2,
        "surveyId":1,
        "userEmail":"UserEmail2@example.com",
        "userPhone":"(###) ###-####"
    },
];
exports.users = users;
`
## Contributing
This project is, for the most part, complete.  Don't fret though, you can still help out your community by [Volunteering with your local Code for America Bridge](https://www.codeforamerica.org/join-us/volunteer-with-us)!  