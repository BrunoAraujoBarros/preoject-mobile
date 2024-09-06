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