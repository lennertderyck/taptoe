const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, Role } = require('../mongo');
const { hashPassword } = require('../utils/credentials');

const read = async (parent, args, context, info) => {
    const { id } = args;
    const currentUserId = context.userId;
    const requestedUserId = id || currentUserId;
    
    try {
        const result = await User.findById(requestedUserId).populate('role');
        return result;
    } catch (error) {
        throw new Error(error);
    }
    
};

const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
            
    const { password } = args.user;
    const hashedPassword = bcrypt.hashSync(password, 12);
            
    delete args.user._id
            
    try {                
        const update = await User.findOneAndUpdate(
            { _id: currentUserId }, 
            { 
                ...args.user,
                ...(password && { password: hashedPassword })
            }, 
            { new: true }
        ).populate('role tribes');
                
        return update;
    } catch (error) {
        throw new Error(error);
    }
}

const createAndGenerateBearer = async (parent, args, context, info) => {
    const { password, email } = args.user;
    const hashedPassword = bcrypt.hashSync(password, 12);    
            
    try {           
        // query user based on email     
        const user = await User.findOne({ email: email });
        
        // if no user was found, create a new one
        if (!user) {
            const created = await User.create({
                ...args.user,
                password: hashedPassword
            });
            
            const populatedUser = await User.findById(created._id);
            const token = hashPassword({ userId: created._id })
            
            return {
                created: populatedUser,
                token
            };
        }
        // if a user was found you cant create a new one
        else {
            throw new Error('User already exists');
        }
    } catch (error) {
        throw new Error(error);
    }
}

const updateRole = async (parent, args, context, info) => {
    const { userId, roleId } = args;
            
    try {
        const user = await User.findById(userId);
        const role = await Role.findById(roleId);
                
        if (!user || !role) {
            throw new Error('User or Role does not exist');
        }
        
        User.updateOne()
                
        await user.updateOne({ role: role._id });
        const populatedUser = await User.findById(user._id).populate('role');
        return populatedUser;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    read,
    createOrUpdate,
    createAndGenerateBearer,
    updateRole
}