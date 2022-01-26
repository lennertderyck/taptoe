const { Location } = require("../mongo");

const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { location, id } = args;
    const { pricingPackage, ...otherLocationProps } = location
    
    try {
        const result = await Location.findById(id);
        
        if (!result) {
            const created = await Location.create({
                ...otherLocationProps,
                creator: currentUserId,
            });
            
            const populated = await Location.findById(created._id).populate("creator pricing");
            return populated;
        } else {
            const updated = await Location.findByIdAndUpdate(
                id, 
                {
                    ...otherLocationProps,
                    pricing: pricingPackage
                },
                { new: true }
            ).populate("creator tribe pricing");
            
            return updated;
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

const find = async (parent, args, context, info) => {
    const locations = await Location.find().populate("creator tribe pricing");
    console.log(locations)
    return locations;
}

const findById = async (parent, args, context, info) => {
    const { id } = args;
    const location = await Location.findById(id).populate("creator tribe pricing");
    return location;
}

module.exports = {
    createOrUpdate,
    find,
    findById,
}