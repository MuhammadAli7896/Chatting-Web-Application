const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const { decrypt } = require("../config/encryption");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat");

        let messages2 = [...messages];
        messages2.forEach(message => {
            message.content = decrypt(message.content, process.env.KEY, process.env.IV);
        })
        res.json(messages2);
    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error(error.message);
    }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId, picture } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.status(400).send("Invalid data passed into request");
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
        isPicture: picture
    };

    try {
        let message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
        message.content = decrypt(message.content, process.env.KEY, process.env.IV);
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { allMessages, sendMessage };