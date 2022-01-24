const { model } = require('mongoose');

module.exports = {
    User: model('User', require('./models/user')),
    Tribe: model('Tribe', require('./models/tribe')),
    Role: model('Role', require('./models/role')),
}