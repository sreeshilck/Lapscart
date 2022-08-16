const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require('twilio')(accountSid, authToken)



module.exports.sendOtp = (number) => {
    const res =  client.verify
        .services(serviceSid)
        .verifications.create({
            to: `+91${number}`,
            channel: "sms"
        })
    return res;
}

module.exports.verifyOtp = (otp, number) => {
    const res = client.verify
        .services(serviceSid)
        .verificationChecks.create({
            to: `+91${number}`,
            code: otp
        })
    return res;
}