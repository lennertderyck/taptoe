/**
 * The Query Resolvers
 */

const { User, Role  } = require('../mongo')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const { tribeController, userController, authController, rolesController } = require('../controllers');
const { JWT_SECRET } = process.env;
const dayjs = require('dayjs');


module.exports = {
    Query: {
        status: (parent, args, context, info) => {
            const { start } = args;
            
            const requestTime = dayjs(start);
            const currentTime = dayjs();
            const warp = currentTime.diff(requestTime, 'millisecond');
            
            return {
                status: 'ok',
                wakeup: {
                    warp,
                    request: requestTime.toISOString(),
                    response: currentTime.toISOString()
                }
            }
        },
        
        login: authController.login,
        
        readRoles: rolesController.findAll,
        
        readUser: userController.read,
        
        readTribe: tribeController.findById,
        readTribes: tribeController.find,
        readTribesByOwnerID: tribeController.findByOwnerId
    },
}