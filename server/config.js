require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_account_SID: process.env.TWILIO_ACCOUNT_SID,
    twilio_number: process.env.TWILIO_NUMBER,
    server_url: process.env.SERVER_URL
}
