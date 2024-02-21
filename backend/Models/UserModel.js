const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
    {
        name: { type: "String", required: true },
        email: { type: "String", unique: true, required: true },
        password: { type: "String", required: true },
        pic: {
            type: "String",
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        passwordResetToken: {
            type: String,
            default: undefined,
        },
        passwordResetTokenExpiresIn: {
            type: Date,
            default: undefined,
        },
    },
    { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomInt(Number.parseInt(process.env.MIN_LIMIT), Number.parseInt(process.env.MAX_LIMIT)).toString();

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpiresIn = Date.now() + 60 * 10000;

    return resetToken;
}

const User = mongoose.model("User", userSchema);

module.exports = User;