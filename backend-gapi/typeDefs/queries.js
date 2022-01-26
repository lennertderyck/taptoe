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
    
    login(credentials: LoginInput): Login
    
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
    
    """
      Verify if a users' token is still valid
    """
    verifyToken: User
    
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
    
    # LOCATIONS
    readLocation(id: ID!): Location
    readLocations: [Location]
    readLocationsByTribeID(tribeId: ID): [Location]
  }
`