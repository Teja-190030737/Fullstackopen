import React from "react";
import { View, StyleSheet } from "react-native";

import Avatar from "./Avatar";
import Text from "../Text";
import theme from "../theme";

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
    description: {
        marginTop: 5
    },
    language: {
        flexDirection: 'row',
        marginTop: 15
    },
    badge: {
        borderStyle: 'solid',
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        textAlign: 'center',
        padding: 5,
        flexGrow: 0
    }
});

const Description = ({ ownerAvatarUrl, 
fullName, description, language, languages }) => {
    return (
        <View style={styles.container}>
            <Avatar ownerAvatarUrl={ownerAvatarUrl} />
            <View style={styles.content}>
                <Text fontWeight="bold"
                fontSize="subheading" testID="fullname">{fullName}</Text>
                <Text color="textSecondary"
                style={styles.description} testID="description">{description}</Text>
                { language &&
                <View style={styles.language}>
                    <Text color="textBar"
                    style={styles.badge} testID="language">{language}</Text>
                </View>
                }
                { languages &&
                <View style={[styles.language, { justifyContent: 'space-between',
                flexWrap: 'wrap' }]}>
                    { languages.map(language =>
                        <Text key={language} style={[styles.badge, { marginBottom: 5 }]}
                        color="textBar">
                            { language }
                        </Text>)
                    }
                </View>
                }
            </View>
        </View>
    );
};

export default Description;