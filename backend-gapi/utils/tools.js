const resolveUserValidationType = (validationType) => {
    return {
        EMAIL: ['email'],
        FIRSTNAME: ['firstName'],
        LASTNAME: ['lastName'],
        NAME: ['lastName', 'firstName'],
    }[validationType]
}

const resolveTribeValidationType = (validationType) => {
    return {
        EMAIL: ['email'],
        NAME: ['name'],
    }[validationType]
}

module.exports = {
    resolveUserValidationType,
    resolveTribeValidationType
}