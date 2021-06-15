import { gql } from "apollo-boost";

export const BASIC_INFO = gql`
    fragment BASIC_INFO on Repository {
        id
        fullName
        stargazersCount
        forksCount
        ownerAvatarUrl
        reviewCount
        ratingAverage
        description
        language
    }
`;

export const ACCESS_TOKEN = gql`
    fragment ACCESS_TOKEN on AuthorizationPayload {
        accessToken
    }
`;

export const AUTHORIZED_USER = gql`
    fragment AUTHORIZED_USER on User {
        id
        username
    }
`;