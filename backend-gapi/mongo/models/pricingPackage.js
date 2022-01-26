const { Schema } = require("mongoose");

const PricingPackage = new Schema({
    duration: {
        type: String,
        enum: ["DAYS", "WEEKS", "MONTHS"],
        default: "DAYS",
    },
    durationAmount: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        default: 0,
    },
    registredTribeOrganisation: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
    },
    tribe: {
        type: Schema.Types.ObjectId,
        ref: "Tribe",
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = PricingPackage;