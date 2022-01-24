const { Role } = require("../mongo");

const findAll = async (parent, args, context, info) => {
    const role = await Role.find();
    return role;
}

module.exports = {
    findAll
}