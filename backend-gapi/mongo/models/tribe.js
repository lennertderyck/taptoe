const { Schema } = require('mongoose');

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    description: {
        type: String,
    },
    registered: {
        type: Boolean,
        default: false
    },
    referral: {
        type: String,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    owners: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date
    }
})