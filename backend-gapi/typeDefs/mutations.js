/**
 * The GraphQL mutations
 */

const { gql } = require('apollo-server');

module.exports = gql`
    type Mutation {
        # ROLES
        writeRole(role: UserRoleInput!, id: ID): UserRole @auth(requires: "ADMIN")
        
        # USERS
        writeUser(user: UserInput): User
        writeUserAndLogin(user: UserInput): Login
        writeUserRole(userId: ID!, roleId: ID!): User @auth(requires: "ADMIN")
        
        # TRIBES
        writeTribe(tribe: TribeInput): Tribe @auth(requires: "USER")
        
        # LOCATIONS
        writeLocation(location: LocationInput, id: ID): Location @auth(requires: "USER")
    }
`