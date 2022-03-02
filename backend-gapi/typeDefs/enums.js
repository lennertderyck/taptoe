const { gql } = require("apollo-server-core");

module.exports = gql`
  enum StoveType {
    GAS
    ELECTRIC
    BOTH
    UNKNOWN
    NONE
  }
  
  enum InternetType {
    WIFI
    ETHERNET
    BOTH
    UNKNOWN
  }
  
  enum InternetUnit {
    MB
    GB
  }
  
  enum PricingDuration {
    DAYS
    WEEKS
    MONTHS
  }
  
  enum UserRole {
    ADMIN
    USER
    GUEST
  }
  
  enum UserValidationType {
    EMAIL
    FIRSTNAME
    LASTNAME
    NAME
  }
  
  enum TribeValidationType {
    NAME
    EMAIL
  }
`