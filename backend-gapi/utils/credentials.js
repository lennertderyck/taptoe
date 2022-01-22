const { AuthenticationError } = require('apollo-server-core');
const jwt = require('jsonwebtoken');
const { TOKEN_SALT } = process.env

const hashPassword = (signData, expiresIn = '1h') => jwt.sign(signData, TOKEN_SALT, { expiresIn });

const protectedRoute = ([ parent, args, context, info ], callbackFn) => {
    if (!context.userId) {
        throw new AuthenticationError('You must be logged in to access this route');
    } else {
        return callbackFn && callbackFn(parent, args, context, info);
    }
}

module.exports = {
    hashPassword,
    protectedRoute
}