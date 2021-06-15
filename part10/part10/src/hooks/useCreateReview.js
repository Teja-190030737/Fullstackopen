import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-native";

const useCreateReview = () => {
    const apolloClient = useApolloClient();
    const history = useHistory();
    const [mutate, result] = useMutation(CREATE_REVIEW, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: async (data) => {
            await apolloClient.resetStore();
            history.push(`/${data.createReview.repository.id}`);
        }
    });

    const createReview = async ({ repositoryName,
    repositoryOwner, rating, text }) => {
        await mutate({ variables: { 
                repositoryName,
                ownerName: repositoryOwner,
                rating: Number(rating),
                text
            }
        });
    };

    return [createReview, result];
};

export default useCreateReview;