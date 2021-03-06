const { Schema } = require("mongoose");
const mongooseSoftDelete = require('mongoose-delete');

const Organisation = new Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deleted_at: Date,
    verified: {
        isVerified: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
        },
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
    }
});

Organisation.virtual('tribes', {
    ref: 'Tribe',
    localField: '_id',
    foreignField: 'organisation',
})


module.exports = Organisation;