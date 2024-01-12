const twilio = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const config = require('../config');

const twilioClient = twilio(config.twilio_account_SID, config.twilio_auth_token);
let meetingInfo;

// create outbound call
exports.makeCall = async (meetingDetails, to, from) => {
    meetingInfo = meetingDetails;
    try {
        const call = await twilioClient.calls.create({
            url: `${config.server_url}/welcome`,
            to: to,
            from: from || config.twilio_number,
        });

        console.log(call);
        return 'Outbound call initiated successfully!';
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

// first twiml response to user
exports.welcome = () => {
    const twiml = new VoiceResponse();
    twiml.say(meetingInfo);
    const gatherI = twiml.gather({ input: "dtmf", numDigits: 1, actionOnEmptyResult: true, action: '/handle-gather', method: 'POST', timeout: 10 })
    gatherI.say('To confirm your attendance, press 1. To decline, press 2.');

    twiml.redirect('/welcome');
    return twiml.toString();
}

// handle user's input 
exports.handleAttendance = (digit) => {
    console.log("run" + digit);
    const options = {
        '1': this.confirmAttendance,
        '2': this.declineAttendance
    }
    return options[digit] ? options[digit]() : this.invalidInput();

}

// if user confirms the attendance
exports.confirmAttendance = () => {
    const twiml = new VoiceResponse();

    twiml.say('Thank You for your confirmation !');
    twiml.say('Good Bye, Have a great day');
    twiml.hangup();

    return twiml.toString();
}

// if user declines the attendance
exports.declineAttendance = () => {
    const twiml = new VoiceResponse();
    twiml.say('why');
    twiml.hangup();
    return twiml.toString();
}

// invalid input (otherthan 1 or 2 key)
exports.invalidInput = () => {
    const twiml = new VoiceResponse();

    twiml.say('Invalid Input, returning to the main menu');
    twiml.redirect('/welcome');
    return twiml.toString();
}

