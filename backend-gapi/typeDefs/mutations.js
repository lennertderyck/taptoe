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
        
        # AUTH SCOPES
        writeAuthScope(authScope: AuthScopeInput!, id: ID): AuthScope @auth(requires: "ADMIN")
        deleteAuthScope(id: ID!): AuthScope @auth(requires: "ADMIN")
        
        # OTP TOKENS
        writeSignInToken(userId: ID!): String @auth(requires: "ADMIN")
        
        # ORGANISATIONS
        writeOrganisation(organisation: OrganisationInput, id: ID): Organisation
        
        # TRIBES
        writeTribe(tribe: TribeInput, id: ID): Tribe @auth(requires: "USER")
        
        # LOCATIONS
        writeLocation(location: LocationInput, id: ID): Location @auth(requires: "USER")
        deleteLocation(id: ID): [ID] @auth(requires: "USER")
        
        # PRICING PACKAGES
        writePricingPackage(pricingPackage: PricingPackageInput, id: ID): LocationPricingPackage @auth(requires: "USER")
        
        # USER PIN
        writeUserPin(pinItemId: ID, pinType: String): UserPin @auth(requires: "USER")
        deleteUserPin(id: ID): [ID] @auth(requires: "USER")
    }
`