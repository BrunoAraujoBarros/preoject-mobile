import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
    query FindAllUsers {
        findAllUsers {
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