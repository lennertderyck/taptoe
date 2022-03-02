const { Schema } = require("mongoose");
const mongooseSoftDelete = require('mongoose-delete');

const Role = new Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    includes: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
    scopes: [{
        type: Schema.Types.ObjectId,
        ref: 'AuthScope'
    }]
})

module.exports = Role;