/**
 * The Query Resolvers
 */

const { User  } = require('../mongo')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const { groupController } = require('../controllers');
const { TOKEN_SALT } = process.env;
const dayjs = require('dayjs');


module.exports = {
    Query: {
        test: () => 'test',
        
        status: (parent, args, context, info) => {
            const { start } = args;
            
            const requestTime = dayjs(start);
            const currentTime = dayjs();
            const diff = currentTime.diff(requestTime, 'millisecond');
            
            return {
                status: 'ok',
                wakeup: {
                    diff,
                    request: requestTime.toISOString(),
                    response: currentTime.toISOString()
                }
            }
        },
        
        login: async (parent, args, context, info) => {
            const { email, password } = args.credentials;
            
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new AuthenticationError('Invalid credentials');
                }
                
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) {
                    throw new AuthenticationError('Invalid credentials');
                }
                
                const token = jwt.sign({ userId: user._id }, TOKEN_SALT, { expiresIn: '1h' });
                return {
                    token,
                    user
                };
            } catch (error) {
                throw new Error(error);
            }
        },
        
        readGroup: groupController.findById,
        readGroupsByOwnerID: groupController.findByOwnerId
    },
}