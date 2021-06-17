import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";

import Description from "../ReviewListItem/Description";
import Text from "../Text";
import theme from "../theme";
import useDeleteReview from "../../hooks/useDeleteReview";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.itemBackgroundColor,
        padding: 20
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    linkButton: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        margin: 10,
        borderRadius: 5,
        textAlign: 'center'
    },
    deleteButton: {
        backgroundColor: theme.colors.error,
        padding: 15,
        margin: 10,
        borderRadius: 5,
        textAlign: 'center'
    }
});

const ReviewItem = ({ review, withButtons }) => {
    const [deleteReview] = useDeleteReview();

    return (
        <View style={styles.container}>
            <Description {...review} />
            { withButtons &&
            <View style={styles.containerButton}>
                <Link to={`/${review.repository.id}`}>
                    <Text
                    color="textBar"
                    fontWeight="bold"
                    style={styles.linkButton}>
                        View Repository
                    </Text>
                </Link>
                <TouchableOpacity onPress={ () => deleteReview(review.id) }>
                    <Text
                    color="textBar"
                    fontWeight="bold"
                    style={styles.deleteButton}>
                        Delete Review
                    </Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
};

export default ReviewItem;