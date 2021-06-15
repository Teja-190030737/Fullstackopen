import { Alert } from "react-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

import useAuthorizedUser from "./useAuthorizedUser";

const useDeleteReview = () => {
    const { refetch } = useAuthorizedUser({
        includeReviews: true,
        first: 6
    });
    const [mutate, { loading }] = useMutation(DELETE_REVIEW, {
        onError: (err) => {
            console.log(err);
        }
    });

    const deleteReview = (id) => (
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Delete cancelled!"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        mutate({ variables: { id } });
                        refetch();
                    }
                }
            ],
            {
                cancelable: false
            }
        )
    );

    return [deleteReview, loading];
};

export default useDeleteReview;