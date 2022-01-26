const { Org } = require("../mongo")

const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { organisation, id } = args;
    const { verified: verifiedInput, ...otherOrgProps } = organisation
    
    const verified = {
        isVerified: verifiedInput ? true : false,
        ...(verifiedInput && { date: new Date() })
    }
    
    try {
        const result = await Org.findById(id);
        
        if (!result) {
            const created = await Org.create({
                ...otherOrgProps,
                creator: currentUserId,
                verified
            });
            
            const populated = await Org.findById(created._id).populate("creator");
            return populated;
        } else {
            const updated = await Org.findByIdAndUpdate(
                id, 
                {
                    ...otherOrgProps,
                    verified
                },
                { new: true }
            ).populate("creator");
            
            return updated;
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

const find = async (parent, args, context, info) => {
    const result = await Org.find().populate("creator tribes");
    return result;
}

const findById = async (parent, args, context, info) => {
    const { id } = args;
    const result = await Org.findById(id).populate("creator tribes");
    return result;
}

module.exports = {
    createOrUpdate,
    find,
    findById,
}