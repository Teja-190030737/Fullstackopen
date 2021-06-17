import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "../Text";
import theme from "../theme";

const styles = StyleSheet.create({
    ratingSize: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: 3,
        flexGrow: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: theme.colors.primary
    },
    container: {
        flexGrow: 0
    }
});

const Rating = ({ rating, style }) => {
    const ratingStyles = [
        styles.ratingSize,
        style
    ];

    return (
        <View style={styles.container}>
            <Text fontWeight="bold"
            fontSize="subheading"
            color="primary"
            style={ratingStyles}>
                {rating}
            </Text>
        </View>
    );
};

export default Rating;