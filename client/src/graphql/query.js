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
            }
        }
    `,
    
    TRIBE_BY_ID: gql`
        query tribeById($id: ID!) {
            readTribe(id: $id) {
                name
                email
                website
                verified {
                    id
                    name
                    type
                }
                address {
                    city
                }
                description
                creator {
                    firstName
                }
                locations {
                    name
                }
                owners {
                    firstName
                    lastName
                }
            }
        }
    `,
    
}