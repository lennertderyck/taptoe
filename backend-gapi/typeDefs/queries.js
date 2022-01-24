/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    test: String
    
    status(start: String): ServerStatusResponse
    
    login(credentials: LoginInput): Login
    
    readGroup(id: ID!): Group
    readGroupsByOwnerID: [Group]
  }
`