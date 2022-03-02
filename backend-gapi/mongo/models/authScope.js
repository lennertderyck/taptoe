const { Schema } = require("mongoose");
const softDelete = require('mongoosejs-soft-delete');

const AuthScope = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

AuthScope.plugin(softDelete);

module.exports = AuthScope;