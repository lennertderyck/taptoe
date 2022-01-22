const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../mongo');
const { hashPassword } = require('../utils/credentials');

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
        );
                
        return update;
    } catch (error) {
        throw new Error(error);
    }
}

const createAndGenerateBearer = async (parent, args, context, info) => {
    const { password, email } = args.user;
    const hashedPassword = bcrypt.hashSync(password, 12);    
    
    console.log(args.user)
            
    try {           
        // query user based on email     
        const user = await User.findOne({ email: email });
        
        // if no user was found, create a new one
        if (!user) {
            const created = await User.create({
                ...args.user,
                password: hashedPassword
            });
            
            console.log(created)
            const token = hashPassword({ userId: created._id })
            console.log(token);
            return {
                created,
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



module.exports = {
    createOrUpdate,
    createAndGenerateBearer
}