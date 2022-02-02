/**
 * Indexing TypeDefs
 */

const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');


const scalars = require('./scalars');
const query = require('./query');
const mutation = require('./mutation');
const subscription = require('./subscription');

module.exports = [
    scalars,
    query,
    mutation,
    {
        Json: GraphQLJSON,
        JsonObject: GraphQLJSONObject,
    }
]