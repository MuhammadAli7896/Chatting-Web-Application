const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const sendMail = require("../config/email");
const crypto = require("crypto");
const path = require("path");
const generateRandomPassword = require("../config/randomPassword");

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not registered successfully");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const forgotPassword = asyncHandler(async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({email});

    if(user) 
    {
        const resetToken = user.createResetPasswordToken();
        await user.save();
        const message = `We have received a reset password request.\n\nThis Code is to reset the password: ${resetToken}\nThe Code is valid for only 10 minutes.\n\nThanks,\nChat Nest.`

        try {
            await sendMail({
                email: email,
                subject: "Password change request",
                message: message,
            })
            res.status(200).json({message: "Password change request successful. Code send to the user email."})
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpiresIn = undefined;
            user.save();    
            res.status(500).json({message: "Couldn't send password reset code. Please try again"});
            throw new Error("Couldn't send password reset code. Please try again");
        }
        
    }
    else
    {
        res.status(404);
        throw new Error("Invalid Email. User not found");
    }
})

const resetPassword = asyncHandler(async (req, res, next)=>{
    const {email, code, newPassword} = req.body;

    const token = crypto.createHash('sha256').update(code).digest('hex');
    const user = await User.findOne({email: email, passwordResetToken: token, passwordResetTokenExpiresIn: {$gt: Date.now()}});

    if(!user)
    {
        res.status(400).json({message: "Invalid Token or Token is Expired"});
        return;
    }
    
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;

    user.save();

    res.status(200).json({
        status: 'success',
        token: generateToken(user._id),
    });
})

const SocialAuthUser = asyncHandler(async (req, res) => {
    const {email, pic, name}  = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        const password = generateRandomPassword();

        const user1 = await User.create({
            name: name,
            email: email,
            password: password,
            pic: pic,
        });

        if (user1) {
            res.status(201).json({
                _id: user1._id,
                name: user1.name,
                email: user1.email,
                isAdmin: user1.isAdmin,
                pic: user1.pic,
                token: generateToken(user1._id),
            });
        } else {
            res.status(400);
            throw new Error("Sign in Failed");
        }
    }
})

module.exports = { allUsers, registerUser, authUser, forgotPassword, resetPassword, SocialAuthUser };