const { AuthenticationError } = require("apollo-server-core");
const { Tribe, Location } = require("../mongo");
const { protectedRoute } = require("../utils/credentials");

const createOrUpdate = (...params) => protectedRoute(
    params,
    async (parent, args, context, info) => {
        const currentUserId = context.userId;
        
        const { id } = args.tribe;
        
        try {
            const tribe = await Tribe.findById(id)
            
            // if no tribe was found, create a new one
            if (!tribe) {
                const created = await Tribe.create({
                    ...args.tribe,
                    creator: currentUserId,
                    owners: [currentUserId],
                })
                
                // return the created tribe and populate the needed data
                
                const populated = await Tribe
                    .findById(created._id)
                    .populate("creator owners verified")
                    
                return populated;
            } 
            
            // if tribe was found and the current user is owner, update it
            else if (tribe.owners.includes(currentUserId)) {
                const updated = await Tribe.findByIdAndUpdate(
                    id, 
                    args.tribe,
                    { new: true }
                );
                return updated;
            } 
            
            // if tribe was found and the current user is not owner, throw an error
            else {
                throw new AuthenticationError("You are not allowed to update this tribe");
            }
        } catch (error) {
            throw new Error(error);
        } 
    }
)

const find = async (parent, args, context, info) => {
    // TODO: implement user role based populators
    const tribes = Tribe.find().populate([
        "creator owners verified",
        {
            path: "locations",
            populate: [
                "creator",
                {
                    path: "tribe",
                    populate: "owners"
                },
                // match <-- match is not needed since we implemented a virtual field on the tribe model
            ]
        }
    ])
    return await tribes;
}

const findByOwnerId = (...params) => protectedRoute(
    params,
    async (parent, args, context, info) => {
        const currentUserId = context.userId;
        
        try {
            const tribes = await Tribe
                .find({ owners: currentUserId })
                .populate("creator owners verified")
                
            return tribes;
        } catch (error) {
            throw new Error(error);
        }
    }
)

const findById = (...params) => protectedRoute(
    params,
    async (parent, args, context, info) => {
        const currentUserId = context.userId;
        
        const { id } = args;
        
        try {
            const tribe = await Tribe
                .findOne({
                    _id: id,
                    owners: currentUserId,
                })
                .populate("creator owners verified")
                
            return tribe;
        } catch (error) {
            throw new Error(error);
        }
    }
)

module.exports = {
    createOrUpdate,
    findByOwnerId,
    findById,
    find
}