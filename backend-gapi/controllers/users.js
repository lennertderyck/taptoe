const bcrypt = require('bcrypt');

const { User, Role } = require('../mongo');
const { hashJwtToken } = require('../utils/credentials');
const { resolveUserValidationType } = require('../utils/tools');

const findById = async (parent, args, context, info) => {
    const { id } = args;
    const currentUserId = context.userId;
    const requestedUserId = id || currentUserId;
    
    try {
        const result = await User.findById(requestedUserId).populate([
            'organisation',
            {
                path: 'role',
                populate: ['includes scopes']
            },
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
            'organisation',
            {
                path: 'role',
                populate: ['includes scopes']
            },
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

const validate = async (parent, args, context, info) => {
    const { validationTypes, value, limit, exact } = args;
    
    console.log(args)
    
    // convert enum value to database property
    const resolvedSearchProperties = validationTypes.map(resolveUserValidationType).flat();
    
    // map each property to a mongo query
    const resolvedQuery = resolvedSearchProperties.map(property => {
        // an exact match is required, just return the propery with the value
        if (exact) {
            return {
                [property]: value
            }
        } 
        
        // otherwise, return a regex query which will match any value that contains the value
        else {
            return {
                [property]: {
                    $regex: value,
                    $options: 'ig'
                }
            }
        }
    });
    const limitResults = limit === 0 ? undefined : limit;
    
    try {
        const results = await User.find({
            $or: resolvedQuery,
        }).limit(limitResults);
        
        return results;
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
            
            const populated = await User.findById(created._id).populate([
                {
                    path: 'role',
                    populate: ['includes scopes']
                },
            ]);
            console.log({populated})
            return populated;
            
        } else {
            const updated = await User.findByIdAndUpdate(
                currentUserId, 
                {
                    ...args.user,
                    ...(password && { password: hashedPassword })
                }
            ).populate([
                'tribes pins',
                {
                    path: 'role',
                    populate: ['includes scopes']
                },
            ]);
            
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
                
        await User.findByIdAndUpdate(userId, { role: role._id });
        
        const populatedUser = await User.findById(user._id).populate([
            'organisation',
            {
                path: 'role',
                populate: ['includes scopes']
            },
            {
                path: 'pins',
                populate: ['pinItem']
            },
            {
                path: 'tribes',
                populate: ['creator owners locations verified']
            }
        ]);
        return populatedUser;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    find,
    findById,
    validate,
    createOrUpdate,
    createAndGenerateBearer,
    updateRole
}