import { gql } from '@apollo/client'

export default {
    LOGIN: gql`
        query Login($email: String!, $password: String!) {
            login(credentials: { email: $email, password: $password }) {
                token
                user {
                    firstName
                    lastName
                    email
                    tribes {
                      id
                      name
                    }
                }
            }
        }
    `,
    
    ORGANISATIONS: gql`
        query organisations {
            readOrganisations {
                id
                name
            }
        }
    `,
    
    CURRENT_USER: gql`
        query currentUser {
            readUser {
                id
                firstName
                lastName
                email
                tribes {
                    id
                    name
                }
                role {
                    id
                    name
                    label
                }
            }
        }
    `,
    
    TRIBE_BY_ID: gql`
        query tribeById($id: ID!) {
            readTribe(id: $id) {
                id
                name
                email
                website
                verified {
                    id
                    name
                    type
                }
                address {
                    street
                    number
                    city
                    country
                    addOn
                }
                description
                creator {
                    firstName
                }
                locations {
                    id
                    name
                    address {
                        street
                        number
                        city
                        country
                        addOn
                    }
                }
                owners {
                    firstName
                    lastName
                }
            }
        }
    `,
    
    AVAILABLE_TRIBES_BY_OWNER: gql`
        query readTribesByOwnerID {
            readTribesByOwnerID {
                id
                name
            }
        }
    `,
    
    LOCATIONS: gql`
        query readLocations($filter: String) {
            readLocations(filter: $filter) {
                id
                name
                description
                latitude
                longitude
                address {
                    street
                    number
                    city
                    country
                    addOn
                }
                tribe {
                    id
                    name
                    email
                    website
                }
                pricing {
                    duration
                    durationAmount
                }
            }
        }
    `,
    
    LOCATION_BY_ID: gql`
        query readLocation($id: ID!) {
            readLocation(id: $id) {
                id
                name
                description
                latitude
                longitude
                address {
                    street
                    number
                    city
                    country
                    addOn
                }
                tribe {
                    id
                    name
                    email
                    website
                    owners {
                        firstName
                        lastName
                    }
                }
                pricing {
                    duration
                    durationAmount
                }
            }
        }
    `,
}