/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Date
  
  type ServerStatusResponseWakeup {
    diff: Int
    request: String
    response: String
  }
  
  type ServerStatusResponse {
    status: String,
    wakeup: ServerStatusResponseWakeup
  }
  
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
    deleted_at: String
    role: UserRole!
  }
  
  type Login {
    token: String!
    user: User!
  }
  
  type Address {
    street: String
    number: Int
    city: String
    zip: String
    country: String,
    addOn: String
  }
  
  type Organisation {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    deleted_at: String
  }
  
  type Group {
    id: ID!
    createdAt: String!
    updatedAt: String!
    deleted_at: String
    name: String!
    email: String
    website: String
    address: Address
    description: String
    registered: Boolean
    referral: Boolean
    creator: User,
    owners: [User],
  }
  
  type LocationKitchenProperties {
    fridge: Boolean
    microwave: Boolean
    oven: Boolean
    dishwasher: Boolean
    stove: StoveType
    cutlery: Boolean
    coffeeMachine: Boolean
    waterHeater: Boolean
    disches: Boolean
    pans: Boolean
    fryer: Boolean
  }
  
  type InternetRestrictions {
    none: Boolean
    amount: Int,
    unit: InternetUnit,
  }
    
  type InternetProperties {
    type: InternetType,
    restrictions: InternetRestrictions
  }
  
  type LocationPricingPackage {
    duration: PricingDuration,
    price: Int,
    registred: Boolean
    description: String
  }
  
  type LocationRooms {
    sleeping: Int
    living: Int
  }
  
  type LocationProperties {
    catering: Boolean
    parking: Boolean
    internet: InternetProperties
    power: Boolean
    kitchen: LocationKitchenProperties
    showers: Int
    toilets: Int
    campfire: Boolean
    rooms: LocationRooms
    pricing: [LocationPricingPackage]
  }
  
  type RentalPeriod {
    start: Int,
    end: Int
  }
  
  type Location {
    id: ID!
    groupId: ID!,
    name: String!
    createdAt: String!
    updatedAt: String!
    deleted_at: String
    address: Address
    latitude: Float
    longitude: Float
    phone: String
    email: String
    website: String
    description: String
    properties: [LocationProperties]
    rentalPeriod: RentalPeriod
  }
  
  type EmailVerification {
    id: ID!
    user: ID!
    token: String!
    createdAt: String!
    updatedAt: String!
    used: Boolean
  }
`