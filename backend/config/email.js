const nodemailer = require('nodemailer');

const sendMail = async (options) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const emailOtions = {
        from: "Chat Nest Support<support@chatnest.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(emailOtions);
}

module.exports = sendMail;