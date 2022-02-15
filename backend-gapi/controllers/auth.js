const { User } = require("../mongo");
const { hashJwtToken } = require("../utils/credentials");
const bcrypt = require("bcrypt");
const signInTokensController = require("./signInTokens");

const login = async (parent, args, context, info) => {
    const { credentials, otpToken } = args;
    
    if (credentials) {
        try {
            const user = await User.findOne({ email: credentials.email }).populate('role tribes');
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }
                    
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) {
                throw new AuthenticationError('Invalid credentials');
            }
            
            const token = hashJwtToken({ userId: user._id, role: user.role.name });
            return {
                token,
                user
            };
        } catch (error) {
            throw new Error(error);
        }
    } else if (otpToken) {
        const response = await signInTokensController.validate(parent, args, context, info)
        
        return response;
    } else {
        throw new Error('Choose either credentials or otpToken to login. None given.');
    }
}

module.exports = {
    login,
}