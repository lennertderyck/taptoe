const { model } = require('mongoose');

module.exports = {
    User: model('User', require('./models/user')),
    Group: model('Group', require('./models/group')),
}