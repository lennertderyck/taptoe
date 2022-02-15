/**
 * The Mutation Resolvers
 */
const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const { userController, tribeController, locationsController, orgsController, rolesController, pricingPackageController, userPinsController, signInTokensController } = require('../controllers');
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
        
        // OTP TOKENS
        writeSignInToken: signInTokensController.create,
        
        // TRIBES
        writeTribe: tribeController.createOrUpdate,
        
        // LOCATIONS
        writeLocation: locationsController.createOrUpdate,
        deleteLocation: locationsController.deleteById,
        
        // PRICING PACKAGES
        writePricingPackage: pricingPackageController.createOrUpdate,
        
        // USER PINS
        writeUserPin: userPinsController.createOrUpdate,
        deleteUserPin: userPinsController.deleteById,
    }
}