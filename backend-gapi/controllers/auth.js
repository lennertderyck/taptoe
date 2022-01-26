const { User } = require("../mongo");
const { hashPassword } = require("../utils/credentials");
const bcrypt = require("bcrypt");

const login = async (parent, args, context, info) => {
    const { email, password } = args.credentials;
            
    try {
        const user = await User.findOne({ email }).populate('role tribes');
        if (!user) {
            throw new AuthenticationError('Invalid credentials');
        }
                
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new AuthenticationError('Invalid credentials');
        }
        
        const token = hashPassword({ userId: user._id, role: user.role.name });
        return {
            token,
            user
        };
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    login,
}