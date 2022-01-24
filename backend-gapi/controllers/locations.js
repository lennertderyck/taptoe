const { Location } = require("../mongo");

const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { location, id } = args;
    
    try {
        const result = await Location.findById(id);
        
        if (!result) {
            const created = await Location.create({
                ...location,
                creator: currentUserId,
            });
            
            const populated = await Location.findById(created._id).populate("creator");
            return populated;
        } else {
            const updated = await Location.findByIdAndUpdate(
                id, 
                location,
                { new: true }
            ).populate("creator tribe");
            
            return updated;
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

const find = async (parent, args, context, info) => {
    const locations = await Location.find().populate("creator tribe");
    console.log(locations)
    return locations;
}

const findById = async (parent, args, context, info) => {
    const { id } = args;
    const location = await Location.findById(id).populate("creator tribe");
    return location;
}

module.exports = {
    createOrUpdate,
    find,
    findById,
}