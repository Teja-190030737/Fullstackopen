import React from "react";
import { TouchableOpacity, StyleSheet, Linking } from "react-native";

import Text from "../Text";
import theme from "../theme";

const styles = StyleSheet.create({
    linkButton: {
        backgroundColor: theme.colors.primary,
        textAlign: 'center',
        padding: 15,
        margin: 10,
        borderRadius: 5
    }
});

const GitHubButton = ({ style, url }) => {
    const buttonStyles = [
        styles.linkButton,
        style
    ];

    return (
        <TouchableOpacity onPress={ () => Linking.openURL(url) }>
            <Text fontWeight='bold'
            color='textBar'
            style={buttonStyles}>
                Open In GitHub
            </Text>
        </TouchableOpacity>
    );
};

export default GitHubButton;