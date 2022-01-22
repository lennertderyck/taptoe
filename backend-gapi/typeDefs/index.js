/**
 * Indexing TypeDefs
 */

const types = require('./types');
const enums = require('./enums');
const inputs = require('./inputs');
const queries = require('./queries');
const mutations = require('./mutations');
// const subscriptions = require('./subscriptions');

module.exports = [
    enums,
    types,
    inputs,
    queries,
    mutations,
//   subscriptions
]