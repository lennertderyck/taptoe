const { Role } = require("../mongo");

const createOrUpdate = async (parent, args, context, info) => {
    const { id, role } = args;
            
    try {
        const result = await Role.findById(id);
                
        if (!result) {
            const suggestedRole = await Role.find({ name: role.name });
                    
            if (suggestedRole.length > 0) {
                throw new Error('Role already exists');
            } else {
                const created = await Role.create(role);
                return created;
            }
        } else {
            await result.updateOne(role);
            
            const populatedRole = await Role.findById(result._id).populate('includes');
            return populatedRole;
        }
    } catch (error) {
        throw new Error(error);
    }
            
}

const findAll = async (parent, args, context, info) => {
    const role = await Role.find();
    return role;
}

module.exports = {
    createOrUpdate,
    findAll,
}