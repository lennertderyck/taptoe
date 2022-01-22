/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input LoginInput {
    email: String!
    password: String!
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

  input GroupInput {
    name: String
    website: String
    address: AddressInput
    description: String,
    email: String
  }
  
  input LocationInput {
    name: String
    address: AddressInput
    groupId: ID
  }
`