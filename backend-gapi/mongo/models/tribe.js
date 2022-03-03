const { Schema } = require('mongoose');
const mongooseSoftDelete = require('mongoose-delete');

const TribeSchema = new Schema({
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
        type: Object
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
    },
    verified: {
        type: Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PUBLISHED', 'DRAFT', 'PENDING', 'UNAPPROVED']
    }
})

// Because location id's are stored on the 'many' side of the relationship,
// we need to add a virtual 'tribe' field to the LocationSchema.
// This allows population without having to store the tribe also in the location collection
TribeSchema.virtual('locations', {
    ref: 'Location', // The model to use
    localField: '_id', // The index
    foreignField: 'tribe' // The field to match
})


module.exports = TribeSchema;