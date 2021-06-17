import React from "react";
import { View, StyleSheet } from "react-native";
import { format } from "date-fns";

import Rating from "./Rating";
import Text from "../Text";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 25
    },
    content: {
        flexGrow: 1,
        marginLeft: 20,
        flexShrink: 1
    },
    date: {
        marginTop: 5
    },
    review: {
        marginTop: 5
    }
});

const Description = ({ text, createdAt,
rating, user }) => {
    return (
        <View style={styles.container}>
            <Rating rating={rating} />
            <View style={styles.content}>
                <Text fontWeight="bold"
                fontSize="subheading">
                    {user.username}
                </Text>
                <Text color="textSecondary"
                style={styles.date}>
                    {format(new Date(createdAt), 'dd.MM.yyyy')}
                </Text>
                <Text style={styles.review}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

export default Description;