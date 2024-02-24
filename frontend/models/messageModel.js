const mongoose = require("mongoose");
const crypto = require('crypto');
const { encrypt } = require('../config/encryption');

const messageSchema = mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, trim: true },
        chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        isPicture: {type: Boolean, default: false}
    },
    { timestamps: true }
);

messageSchema.pre('save', function () {
    if (!this.isModified) {
        next();
    }

    this.content = encrypt(this.content, process.env.KEY, process.env.IV);
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;