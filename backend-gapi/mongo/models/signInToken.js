const { Schema } = require("mongoose");
const softDelete = require('mongoosejs-soft-delete');

const SignInToken = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: null
    },
    usedAt: {
        type: Date,
        default: null
    }
});

SignInToken.plugin(softDelete);

module.exports = SignInToken;