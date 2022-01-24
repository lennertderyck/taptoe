const { Schema } = require("mongoose");

module.exports = new Schema({
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
    }]
})