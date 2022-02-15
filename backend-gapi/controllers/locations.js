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
            
            const populated = await Location.findById(created._id).populate("creator tribe pricing");
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
    const { filter } = args;
    const parsedFilter = filter ? JSON.parse(filter) : {};
    
    const locations = await Location.find({
        ...parsedFilter
    }).populate("creator tribe pricing");
    return locations;
}

const findById = async (parent, args, context, info) => {
    const { id } = args;
    const location = await Location.findById(id).populate(["creator tribe pricing", {
        path: "tribe",
        populate: {
            path: "owners",
        }
    }]);
    return location;
}

const deleteById = async (parent, args, context, info) => {
    const { id } = args;
    
    console.log(args)
    
    try {
        await Location.removeOne({ _id: id });
        return [ id ];
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createOrUpdate,
    find,
    findById,
    deleteById
}