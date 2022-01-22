/**
 * The GraphQL mutations
 */

const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    writeUser(user: UserInput): User
    writeUserAndLogin(user: UserInput): Login
    
    writeGroup(group: GroupInput): Group
    
    addLocation(location: LocationInput): Location
  }
`