/**
 * The GraphQL mutations
 */

const { gql } = require('apollo-server');

module.exports = gql`
    type Mutation {
        writeRole(role: UserRoleInput!, id: ID): UserRole @auth(requires: "ADMIN")
        
        writeUser(user: UserInput): User
        writeUserAndLogin(user: UserInput): Login
        writeUserRole(userId: ID!, roleId: ID!): User @auth(requires: "ADMIN")
        
        writeTribe(tribe: TribeInput): Tribe
        
        addLocation(location: LocationInput): Location
    }
`