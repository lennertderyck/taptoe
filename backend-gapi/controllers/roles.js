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
            const updated = await Role.findByIdAndUpdate(
                id, 
                role, 
                { new: true }
            ).populate('includes scopes');

            return updated;
        }
    } catch (error) {
        throw new Error(error);
    }
            
}

const findAll = async (parent, args, context, info) => {
    const role = await Role.find().populate('includes scopes');
    return role;
}

module.exports = {
    createOrUpdate,
    findAll,
}