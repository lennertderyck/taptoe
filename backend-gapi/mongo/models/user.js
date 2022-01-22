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
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted_at: Date
})

// userSchema.plugin((schema) => {
//     var toJSON = schema.methods.toJSON || Document.prototype.toJSON;

//     schema.set('transformId', {
//         virtuals: false,
        
//     });

//     schema.methods.toJSON = function () {
//         const json = toJSON.apply(this, arguments);

//         delete json._id;
//         delete json.__t;
//         delete json.__v;

//         return json;
//     };
    
//     schema.methods.transformId = function () {
//         console.log('this', this)
//         const g = Object.create(this);
//         console.log('g', g._id)
//         return this;
//     };
// })

module.exports = userSchema