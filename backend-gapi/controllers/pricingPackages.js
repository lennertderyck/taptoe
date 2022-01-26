const { PricingPackage } = require("../mongo")

const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    const { pricingPackage, id } = args;
    
    try {
        const result = await PricingPackage.findById(id);
        
        if (!result) {
            const created = await PricingPackage.create({
                ...pricingPackage,
                creator: currentUserId,
            });
            
            const populated = await PricingPackage.findById(created._id).populate("creator tribe");
            return populated;
        } else {
            const updated = await PricingPackage.findByIdAndUpdate(
                id,
                pricingPackage,
                { new: true }
            ).populate("creator tribe");
            
            return updated;
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createOrUpdate,
}