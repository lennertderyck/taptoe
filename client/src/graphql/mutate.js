import { gql } from "@apollo/client";

export default {
    CREATE_OR_UPDATE_LOCATION: gql`
        mutation createLocation($location: LocationInput!) {
            writeLocation(location: $location) {
                creator {
                  firstName
                  lastName
                }
                tribe {
                  id
                  name
                }
            }
        }
    `
}