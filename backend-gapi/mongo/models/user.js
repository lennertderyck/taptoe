const { Schema, Document } = require('mongoose')

const userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    organisation: {
        type: Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted_at: Date,
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        default: '61eec55b38e0766ab63c049c'
    },
})

userSchema.virtual('tribes', {
    ref: 'Tribe',
    localField: '_id',
    foreignField: 'owners'
})

module.exports = userSchema