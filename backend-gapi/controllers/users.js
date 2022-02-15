const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, Role } = require('../mongo');
const { hashJwtToken } = require('../utils/credentials');

const findById = async (parent, args, context, info) => {
    const { id } = args;
    const currentUserId = context.userId;
    const requestedUserId = id || currentUserId;
    
    try {
        const result = await User.findById(requestedUserId).populate([
            'role', 
            {
                path: 'pins',
                populate: ['pinItem']
            },
            {
                path: 'tribes',
                populate: ['creator owners locations verified']
            }
        ]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const find = async (parent, args, context, info) => {
    try {
        const result = await User.find({}).populate([
            'role',
            {
                path: 'pins',
                populate: ['pinItem']
            },
            {
                path: 'tribes',
                populate: ['creator owners locations verified']
            }
        ]);
        
        return result
    } catch (error) {
        throw new Error(error);
    }
}

const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
            
    const { password } = args.user;
    const hashedPassword = bcrypt.hashSync(password, 12);
            
    delete args.user._id
            
    try {                
        const result = await User.find({ 
            $or: [
                { _id: currentUserId }
            ]    
        });
        
        if (result.length === 0) {
            const created = await User.create({
                ...args.user,
                ...(password && { password: hashedPassword })
            });
            
            const populated = await User.findById(created._id).populate('role');
            console.log({populated})
            return populated;
            
        } else {
            const updated = await User.findByIdAndUpdate(
                currentUserId, 
                {
                    ...args.user,
                    ...(password && { password: hashedPassword })
                }
            ).populate('role tribes pins');
            
            console.log({  updated })
            
            return updated;
        }
    } catch (error) {
        console.log(error)
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
            const token = hashJwtToken({ userId: created._id })
            
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
        const populatedUser = await User.findById(user._id).populate('role tribes pins');
        return populatedUser;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    find,
    findById,
    createOrUpdate,
    createAndGenerateBearer,
    updateRole
}