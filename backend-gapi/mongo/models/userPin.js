const { Schema } = require('mongoose')

const UserPins = new Schema({
    pinType: { // <-- the mongoose model to populate
        type: String,
        required: true,
        enum: ['Tribe', 'Location'] // <-- these models can be pinned and populated
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    pinItem: {
        type: Schema.Types.ObjectId,
        refPath: "pinType" // <-- dynamic ref, based on pinType
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = UserPins