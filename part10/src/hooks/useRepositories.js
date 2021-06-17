import { useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-debounce";

const useRepositories = (variables) => {
    const { orderBy, orderDirection, text, first } = variables;
    const [delayedText] = useDebounce(text, 500);
    const [getRepositories, { data, loading, fetchMore }] = useLazyQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    const fetchRepositories = () => {
        getRepositories({ variables: { orderBy, orderDirection, text, first }});
    };

    const filteredRepositories = () => {
        getRepositories({ variables: { text: delayedText, orderBy, orderDirection, first } });
    };

    useEffect(() => {
        fetchRepositories();
    }, [orderBy, orderDirection]);

    useEffect(() => {
        filteredRepositories();
    }, [delayedText]);

    const handleFetchMore = () => {
        const canFetchMore =
        !loading && data && data.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORIES,
            variables: {
                ...variables,
                after: data.repositories.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repositories: {
                        ...fetchMoreResult.repositories,
                        edges: [
                            ...previousResult.repositories.edges,
                            ...fetchMoreResult.repositories.edges
                        ]
                    }
                };

                return nextResult;
            }
        });
    };

    return {
        repositories: data ? data.repositories : undefined,
        loading,
        fetchMore: handleFetchMore
    };
};

export default useRepositories;