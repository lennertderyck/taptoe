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
}