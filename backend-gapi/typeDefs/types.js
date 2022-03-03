/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Json
  scalar JsonObject
  scalar Date
  
  type ServerStatusResponseWakeup {
    warp: Int
    request: String
    response: String
  }
  
  type ServerStatusResponse {
    status: String,
    wakeup: ServerStatusResponseWakeup
  }
  
  type UserRole {
    id: ID!
    name: String!
    label: String!
    includes: [UserRole]
    scopes: [AuthScope]
  }
  
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
    deleted: Boolean
    role: UserRole!
    tribes: [Tribe]
    pins: [UserPin]
  }
  
  type AuthScope {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    description: String
    creator: User
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
  
  type OrganisationVerification {
    isVerified: Boolean
    date: String
  }
  
  type Organisation {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    deleted: Boolean
    verified: OrganisationVerification
    creator: User
    tribes: [Tribe]
    type: String
  }
  
  type Tribe {
    id: ID!
    createdAt: String!
    updatedAt: String!
    deleted: Boolean
    name: String
    email: String
    website: String
    address: Address
    description: String
    registered: Boolean
    referral: Boolean
    creator: User,
    owners: [User],
    locations: [Location],
    verified: Organisation
    status: TribeStatus
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
    id: ID!
    duration: PricingDuration
    durationAmount: Int
    price: Float
    registredTribeOrganisation: Boolean
    description: String
    tribe: Tribe
    creator: User
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
  }
  
  type RentalPeriod {
    start: Int,
    end: Int
  }
  
  type Location {
    id: ID!
    tribe: Tribe,
    name: String!
    createdAt: String!
    updatedAt: String!
    deleted: Boolean
    address: Address
    latitude: Float
    longitude: Float
    phone: String
    email: String
    website: String
    description: String
    creator: User
    # owners: [User] <-- owners are assigned by the tribe of the location
    properties: [LocationProperties]
    rentalPeriod: RentalPeriod
    pricing: [LocationPricingPackage]
  }
  
  type EmailVerification {
    id: ID!
    user: ID!
    token: String!
    createdAt: String!
    updatedAt: String!
    used: Boolean
  }
  
  type BookingPeriod {
    start: Int
    end: Int
  }
  
  type BookingPricing {
    package: LocationPricingPackage
    
    # save the current pricing package
    duration: PricingDuration,
    durationAmount: Int
    price: Float,
    registredTribeOrganisation: Boolean
    description: String
    location: Location
    creator: User
  }
  
  type Booking {
    id: ID!
    createdAt: String!
    updatedAt: String!
    deleted: Boolean
    creator: User
    location: Location
    accepted: Boolean
    period: BookingPeriod
    pricing: BookingPricing
    description: String
  }
  
  type UserPin {
    id: ID!
    createdAt: String!
    updatedAt: String!
    deleted: Boolean
    creator: User
    pinType: String,
    pinItem: Json
  }
`