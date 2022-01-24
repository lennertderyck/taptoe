const { Schema } = require("mongoose");

module.exports = new Schema({
    tribe: {
        type: Schema.Types.ObjectId,
        ref: "Tribe",
    },
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
    deleted_at: {
        type: Date
    },
    address: {
        type: Object
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    description: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    properties: {
        type: Object
    },
    rentalPeriod: {
        type: Object
    },
})