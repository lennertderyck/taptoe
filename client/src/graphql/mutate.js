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
    `,
    
    CREATE_OR_UPDATE_TRIBE: gql`
      mutation writeTribe($tribe: TribeInput) {
        writeTribe(tribe: $tribe) {
          id    
        }
      }
    `,
    
    DELETE_LOCATION: gql`
      mutation deleteLocation($id: ID!) {
        deleteLocation(id: $id)
      }
  `,
  
  CREATE_OR_UPDATE_PIN: gql`
    mutation writeUserPin($pinItemId: ID, $pinType: String) {
      writeUserPin(pinItemId: $pinItemId, pinType: $pinType) {
        id
      }
    }
  `,
  
  DELETE_PIN: gql`
    mutation deleteUserPin($id: ID!) {
      deleteUserPin(id: $id)
    }
  `,
  
  CREATE_OR_UPDATE_ROLE: gql`
  mutation writeRole($role: UserRoleInput!, $id: ID) {
    writeRole(role: $role, id: $id) {
      id
    }
  }
  `
}