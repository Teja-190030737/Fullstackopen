import { useEffect } from "react";
import { GET_REVIEWS } from "../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";

const useReviews = (variables) => {
    const { id } = variables;
    const [getReviews, { loading, data, fetchMore }] = useLazyQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    const fetchReviews = (id) => {
        getReviews({ variables: { id } });
    };

    useEffect(() => {
        fetchReviews(id);
    }, []);

    const handleFetchMore = () => {
        const canFetchMore =
        !loading && data && data.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REVIEWS,
            variables: {
                ...variables,
                after: data.repository.reviews.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges
                            ]
                        }
                    }
                };

                return nextResult;
            }
        });
    };

    return {
        reviews: data ? data.repository.reviews : undefined,
        loading,
        refetch: fetchReviews,
        fetchMore: handleFetchMore
    };
};

export default useReviews;