/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input QueryFilterInput {
    field: String,
    operator: String,
    value: String
  }

  input LoginInput {
    email: String!
    password: String!
  }
  
  input UserRoleInput {
    name: String!
    label: String!
    includes: [ID]
  }

  input UserInput {
    email: String
    firstName: String
    lastName: String
    password: String
    passwordConfirmation: String
  }

  input AddressInput {
    street: String
    number: Int
    city: String
    zip: String
    country: String
    addOn: String
  }

  input TribeInput {
    name: String
    website: String
    address: AddressInput
    description: String,
    email: String
    
    """
      The ID of a registerd organisation
    """
    verified: ID @auth(requires: "ADMIN")
  }
  
  input LocationInput {
    name: String
    address: AddressInput
    longitude: Float
    latitude: Float
    tribe: ID
    pricingPackage: [ID]
  }
  
  input OrganisationInput {
    name: String
    verified: Boolean
    type: String
  }
  
  input PricingPackageInput {
    duration: PricingDuration
    durationAmount: Int
    price: Float
    registredTribeOrganisation: Boolean
    description: String
    tribe: ID
  }
`