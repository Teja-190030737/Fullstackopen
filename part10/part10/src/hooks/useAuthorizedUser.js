import { useQuery } from "@apollo/react-hooks";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = (variables) => {
    const { includeReviews } = variables;
    const { data, loading, fetchMore, refetch } = useQuery(GET_AUTHORIZED_USER, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    const handleFetchMore = () => {
        const canFetchMore =
        includeReviews
        && !loading
        && data
        && data.authorizedUser.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_AUTHORIZED_USER,
            variables: {
                ...variables,
                after: data.authorizedUser.reviews.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    authorizedUser: {
                        ...fetchMoreResult.authorizedUser,
                        reviews: {
                            ...fetchMoreResult.authorizedUser.reviews,
                            edges: [
                                ...previousResult.authorizedUser.reviews.edges,
                                ...fetchMoreResult.authorizedUser.reviews.edges
                            ]
                        }
                    }
                };

                return nextResult;
            }
        });
    };

    return {
        authorizedUser: data ? data.authorizedUser : undefined,
        reviews: data ?
        (data.authorizedUser ? data.authorizedUser.reviews : undefined)
        : undefined,
        loading,
        fetchMore: handleFetchMore,
        refetch
    };
};

export default useAuthorizedUser;