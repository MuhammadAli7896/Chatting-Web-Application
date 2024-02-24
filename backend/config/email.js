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


    const emailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(emailOptions);
}

module.exports = sendMail;