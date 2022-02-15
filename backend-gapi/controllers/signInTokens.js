const jwt = require('jsonwebtoken');
const { SignInToken, User } = require("../mongo");
const { hashJwtToken } = require("../utils/credentials");

const create = async (parent, args, context, info) => {
    const { userId } = args;
    
    try {
        // Find the correct user
        const user = await User.findById(userId).populate('role');
        
        // Generate expiration data
        const expirationHours = 1;
        const nowDate = new Date();
        const tokenExpiration = new Date(new Date().setHours(nowDate.getHours() + expirationHours));
                
        if (user) {
            // Generate new token record
            const created = await SignInToken.create({
                user: user._id,
                expiresAt: tokenExpiration
            });
            
            // Generate otp token
            const token = hashJwtToken(
                { 
                    otpTokenId: created._id, 
                    userId: user._id, 
                    role: user.role.name 
                }, 
                expirationHours + 'h'
            );
            
            // Send token back as response
            return token;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error(error);
    }
};

const validate = async (parent, args, context, info) => {
    const { otpToken } = args;
    
    try {
        const decodedOtpToken = jwt.verify(otpToken, process.env.TOKEN_SALT);
        if (!decodedOtpToken) return null;
        
        const signInTokenResult = await SignInToken.findById(decodedOtpToken.otpTokenId).populate({
            path: 'user',
            populate: ['role', {
                path: 'tribes',
                populate: ['creator owners locations verified']
            }]
        });
        
        console.log({ signInTokenResult })
        
        if (signInTokenResult && !signInTokenResult.usedAt && signInTokenResult.expiresAt > new Date()) {
            const token = hashJwtToken({ userId: decodedOtpToken.userId, role: decodedOtpToken.role });
            
            await SignInToken.findByIdAndUpdate(
                signInTokenResult._id,
                {
                    usedAt: new Date()
                }
            )
            
            return {
                token: token,
                user: signInTokenResult.user
            }
        } else {
            throw new Error('Token not found or invalid')
        } 
    } catch (error) {
        throw new Error(error);
    }
    
}

module.exports = {
    create,
    validate,
}