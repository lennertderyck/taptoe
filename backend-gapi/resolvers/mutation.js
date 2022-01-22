/**
 * The Mutation Resolvers
 */
const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const { userController, groupController } = require('../controllers');
const { User, Group } = require('../mongo');
const { protectedRoute } = require('../utils/credentials');
const { transformId } = require('../utils/mongo');

/**
 * read -> read a record
 * write -> create or update a record
 * delete -> delete a record
 */

module.exports = {
    Mutation: { 
        writeUser: userController.createOrUpdate,
        writeUserAndLogin: userController.createAndGenerateBearer,
        
        writeGroup: groupController.createOrUpdate,
        // addLocation: async (parent, args, context, info) => {
        // }
    }
}