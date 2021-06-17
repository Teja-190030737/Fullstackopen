import { gql } from "apollo-boost";

import { BASIC_INFO } from "./fragments";
import { AUTHORIZED_USER } from "./fragments";

export const GET_REPOSITORIES = gql`
    query fetchRepositories($orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection, $text: String, $first: Int,
    $after: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection,
        searchKeyword: $text, first: $first, after: $after) {
            pageInfo {
                hasNextPage
                endCursor
                totalCount
                startCursor
            }
            edges {
                node {
                    ...BASIC_INFO
                }
                cursor
            }
        }
    }
    ${ BASIC_INFO }
`;

export const GET_AUTHORIZED_USER = gql`
    query getAuthorizedUser($includeReviews: Boolean = false,
    $first: Int, $after: String) {
        authorizedUser {
            ...AUTHORIZED_USER,
            reviews(first: $first, after: $after) @include(if: $includeReviews) {
                pageInfo {
                    hasNextPage
                    startCursor
                    endCursor
                    totalCount
                }
                edges {
                    node {
                        id
                        text
                        createdAt
                        rating
                        user {
                            id
                            username
                        }
                        repository {
                            id
                        }
                    }
                    cursor
                }
            }
        }
    }
    ${ AUTHORIZED_USER }
`;

export const GET_REPOSITORY = gql`
    query repoView($id: ID!) {
        repository(id: $id) {
            ...BASIC_INFO,
            url
        }
    }
    ${BASIC_INFO}
`;

export const GET_REVIEWS = gql`
    query fetchReviews($id: ID!, $first: Int,
    $after: String) {
        repository(id: $id) {
            id
            fullName
            reviews(first: $first, after: $after) {
                pageInfo {
                    hasNextPage
                    endCursor
                    startCursor
                    totalCount
                }
                edges {
                    node {
                        id
                        text
                        createdAt
                        rating
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;