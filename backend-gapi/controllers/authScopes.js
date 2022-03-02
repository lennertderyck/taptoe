const { AuthScope } = require("../mongo");
const { create } = require("./signInTokens");

const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { authScope, id } = args;
    
    try {
        const result = await AuthScope.find({
            $or: [
                { _id: id},
                { name: authScope.name }
            ]
        });
        
        console.log(result);
        
        if (result.length === 0) {
            const created = await AuthScope.create({
                ...authScope,
                creator: currentUserId
            });
            
            console.log({ created });
            return created;
        } else {
            throw new Error('AuthScope already exists');
        }
    } catch (error) {
        throw new Error(error);
    }
}

const findAll = async (parent, args, context, info) => {
    const scopes = await AuthScope.find({});
    
    return scopes;
}

const deleteById = async (parent, args, context, info) => {
    const { id } = args;
    
    try {
        const result = await AuthScope.findByIdAndDelete(id);
        
        if (result) {
            return result;
        } else {
            throw new Error('AuthScope not found');
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createOrUpdate,
    findAll,
    deleteById
}