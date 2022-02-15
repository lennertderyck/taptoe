const { UserPin } = require("../mongo");

const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { pinItemId, pinType, id } = args;
    
    try {
        const result = await UserPin.findOne({
            $or: [
                { _id: id },
                { $and: [
                    { creator: currentUserId },
                    { pinItem: pinItemId },
                ]}
            ]
        });
        
        console.log({ result })
        
        if (!result) {
            const created = await UserPin.create({
                creator: currentUserId,
                pinItem: pinItemId,
                pinType,
            })
            
            const populated = await UserPin.findById(created._id).populate("creator pinItem");
            return populated;
        } else {
            const updated = await UserPin.findByIdAndUpdate(
                result._id,
                {
                    pinItem: pinItemId,
                    pinType,
                },
                { new: true }
            ).populate("creator pinItem");
            
            return updated;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const deleteById = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { id } = args;
    

    try {
        await UserPin.findByIdAndDelete(id)
        
        return [ id ]
    }
    catch (error) {
        throw new Error(error);
    }
}

const findByUserId = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { pinType } = args;
    
    try {
        const result = await UserPin.find({
            creator: currentUserId,
        }).populate("creator pinItem");
        
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const find = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { pinItemId, id } = args;
    
    const result = await UserPin.findOne({
        $and: [
            { creator: currentUserId },
            { pinItem: pinItemId },
        ]
    }).populate("creator pinItem");
    
    return result;
}

module.exports = {
    createOrUpdate,
    findByUserId,
    find,
    deleteById
}
