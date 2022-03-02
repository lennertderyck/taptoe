/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    """
      Get the status of the application server.
      Especially useful when detecting if the server is up and running on the front-end of the application.
      
      It will also return the time it took to wake up the server.
    """
    status(
      "The current timestamp (ISO format) so it can be compared to the request timestamp."
      start: String
    ): ServerStatusResponse @auth(requires: "USER")
    
    login(credentials: LoginInput, otpToken: String): Login
    
    # ORGANISATIONS
    
    readOrganisation(id: ID!): Organisation
    readOrganisations: [Organisation]
    
    # ROLES
    
    """
      Get all the roles.
    """
    readRoles: [UserRole]
    
    """
      Request a role by its ID.
    """
    readRoleById(id: ID!): UserRole
    
    # USERS
    
    """
      Read a user by ID
    """
    readUser(
      "Optional – The ID of the user to read."
      id: ID
    ): User @auth(requires: "USER")
    readUsers: [User] @auth(requires: "ADMIN")
    
    """
      Check if a user exists by various criteria.
    """
    validateUser(
      "The fields to validate the user by."
      validationTypes: [UserValidationType!], 
      "The value to validate against."
      value: String!, 
      """
        Limit the amount of results. 
        When set to 0, no limit is applied. 
        Default is 4.
      """
      limit: Int = 4
      
      "The ID of users to exclude from the results."
      exclude: [ID]
    ): [User]
    
    """
      Verify if a users' token is still valid
    """
    verifyToken: User
    
    # AUTH SCOPES
    readAuthScopes: [AuthScope]
    
    # TRIBES
    
    """
      Request a tribe by its ID.
    """
    readTribe(id: ID!): Tribe
    
    """
      Request all tribes.
      The returned data will be dependent on the user's role.
    """
    readTribes: [Tribe]

    """
      Request all tribes by the owner's ID.
      The returned data will be dependent on the user's role.
    """
    readTribesByOwnerID: [Tribe]
    
    """
    """
    validateTribe(
      "The fields to validate the tribe by."
      validationTypes: [TribeValidationType!]
      
      "The value to validate against."
      value: String!
      
      "Limit the amount of results. When set to 0, no limit is applied. Default is 4."
      limit: Int = 4
      
      "The ID of tribes to exclude from the results."
      exclude: [ID]
    ): [Tribe]
    
    # LOCATIONS
    readLocation(id: ID!): Location
    readLocations(
      "Optional – Extra filter options in stringified JSON format."
      filter: String
    ): [Location]
    readLocationsByTribeID(tribeId: ID): [Location]
    
    # USER PIN
    readUserPinById(id: ID): UserPin @auth(requires: "USER")
    readUserPin(pinItemId: ID, pinType: String): UserPin @auth(requires: "USER")
    readUserPins: [UserPin] @auth(requires: "USER")
  }
`