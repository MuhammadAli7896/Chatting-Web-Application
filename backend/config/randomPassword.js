const crypto = require('crypto');

const generateRandomPassword = () => {
    const password = crypto.randomInt(Number.parseInt(process.env.MIN_LIMIT), Number.parseInt(process.env.MAX_LIMIT)).toString();
    return password;
}

module.exports = generateRandomPassword;