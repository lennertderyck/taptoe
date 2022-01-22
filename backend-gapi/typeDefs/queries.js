/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    test: String
    
    login(credentials: LoginInput): Login
    
    readGroup(id: ID!): Group
    readGroupsByOwnerID: [Group]
  }
`