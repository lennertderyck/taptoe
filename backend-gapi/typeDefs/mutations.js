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
        
        # ORGANISATIONS
        writeOrganisation(organisation: OrganisationInput, id: ID): Organisation
        
        # TRIBES
        writeTribe(tribe: TribeInput): Tribe @auth(requires: "USER")
        
        # LOCATIONS
        writeLocation(location: LocationInput, id: ID): Location @auth(requires: "USER")
        
        # PRICING PACKAGES
        writePricingPackage(pricingPackage: PricingPackageInput, id: ID): LocationPricingPackage @auth(requires: "USER")
    }
`