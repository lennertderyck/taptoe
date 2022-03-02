/**
 * The Query Resolvers
 */

const { User, Role  } = require('../mongo')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const { tribeController, userController, authController, rolesController, locationsController, orgsController, applicationController, userPinsController, authScopesController } = require('../controllers');
const { JWT_SECRET } = process.env;
const dayjs = require('dayjs');


module.exports = {
    Query: {
        // APPLICATION
        status: applicationController.status,
        
        // AUTH
        login: authController.login,
        
        // ORGS
        readOrganisation: orgsController.findById,
        readOrganisations: orgsController.find,
        
        // ROLES
        readRoles: rolesController.findAll,
        
        // AUTH SCOPES
        readAuthScopes: authScopesController.findAll,
        
        // USERS
        readUser: userController.findById,
        readUsers: userController.find,
        validateUser: userController.validate,
        
        // TRIBES
        readTribe: tribeController.findById,
        readTribes: tribeController.find,
        readTribesByOwnerID: tribeController.findByOwnerId,
        validateTribe: tribeController.validate,
        
        // LOCATIONS
        readLocations: locationsController.find,
        readLocation: locationsController.findById,
        
        // USER PINS
        readUserPins: userPinsController.findByUserId,
        readUserPin: userPinsController.find,
    },
}