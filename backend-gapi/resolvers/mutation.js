/**
 * The Mutation Resolvers
 */
const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const { userController, tribeController, locationsController, orgsController, rolesController, pricingPackageController } = require('../controllers');
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
        // ROLES
        writeRole: rolesController.createOrUpdate,
        
        // ORGS
        writeOrganisation: orgsController.createOrUpdate,
        
        // USERS
        writeUserRole: userController.updateRole,
        writeUser: userController.createOrUpdate,
        writeUserAndLogin: userController.createAndGenerateBearer,
        
        // TRIBES
        writeTribe: tribeController.createOrUpdate,
        
        // LOCATIONS
        writeLocation: locationsController.createOrUpdate,
        
        // PRICING PACKAGES
        writePricingPackage: pricingPackageController.createOrUpdate,
    }
}