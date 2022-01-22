const { AuthenticationError } = require("apollo-server-core");
const { Group } = require("../mongo");
const { protectedRoute } = require("../utils/credentials");

const createOrUpdate = (...params) => protectedRoute(
    params,
    async (parent, args, context, info) => {
        const currentUserId = context.userId;
        
        const { id } = args.group;
        
        try {
            const group = await Group.findById(id)
            
            // if no group was found, create a new one
            if (!group) {
                const created = await Group.create({
                    ...args.group,
                    creator: currentUserId,
                    owners: [currentUserId],
                })
                
                // return the created group and populate the needed data
                
                const populated = await Group
                    .findById(created._id)
                    .populate("creator owners")
                    
                return populated;
            } 
            
            // if group was found and the current user is owner, update it
            else if (group.owners.includes(currentUserId)) {
                const updated = await Group.findByIdAndUpdate(
                    id, 
                    args.group, 
                    { new: true }
                );
                return updated;
            } 
            
            // if group was found and the current user is not owner, throw an error
            else {
                throw new AuthenticationError("You are not allowed to update this group");
            }
        } catch (error) {
            throw new Error(error);
        } 
    }
)

const findByOwnerId = (...params) => protectedRoute(
    params,
    async (parent, args, context, info) => {
        const currentUserId = context.userId;
        
        try {
            const groups = await Group
                .find({ owners: currentUserId })
                .populate("creator owners")
                
            return groups;
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
            const group = await Group
                .findOne({
                    _id: id,
                    owners: currentUserId,
                })
                .populate("creator owners")
                
            return group;
        } catch (error) {
            throw new Error(error);
        }
    }
)

module.exports = {
    createOrUpdate,
    findByOwnerId,
    findById
}