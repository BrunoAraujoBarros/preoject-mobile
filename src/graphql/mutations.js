import { gql } from "@apollo/client";

export const DEL_USER_MUTATION = gql`
        mutation RemoveUsers($removeUsersId: ID!) {
    removeUsers(id: $removeUsersId) {
        Password
        UserId
        createdAt
        id
        name
        updatedAt
        url
    }
}
`;


export const CREATE_USER_MUTATION = gql`
    mutation CreateUsers($data: CreateUserInput!) {
    createUsers(data: $data) {
    Password
    UserId
    name
    url
  }
}

`