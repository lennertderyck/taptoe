/**
 * The Mutation Resolvers
 */
const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const { userController, tribeController } = require('../controllers');
const { User, Tribe, Role } = require('../mongo');
const { protectedRoute } = require('../utils/credentials');
const { transformId } = require('../utils/mongo');

/**
 * read -> read a record
 * write -> create or update a record
 * delete -> delete a record
 */

module.exports = {
    Mutation: { 
        writeRole: async (parent, args, context, info) => {
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
                    console.log(populatedRole)
                    return populatedRole;
                }
            } catch (error) {
                throw new Error(error);
            }
            
        },
        
        writeUserRole: userController.updateRole,
        writeUser: userController.createOrUpdate,
        writeUserAndLogin: userController.createAndGenerateBearer,
        
        writeTribe: tribeController.createOrUpdate,
        // addLocation: async (parent, args, context, info) => {
        // }
    }
}