import React from "react";
import { View, StyleSheet } from "react-native";

import theme from "./theme";
import Description from "./RepositoryListItem/Description";
import Statistics from "./RepositoryListItem/Statistics";
import GitHubButton from "./RepositoryListItem/GitHubButton";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.itemBackgroundColor,
        padding: 20
    }
});

// This is where 10.19 starts
const RepositoryItem = ({ fullName,
description, language, forksCount,
stargazersCount, ratingAverage, reviewCount,
ownerAvatarUrl, displayLink, url }) => {
    return (
        <View style={ styles.container } testID="item">
            <Description
                fullName={fullName}
                description={description}
                language={language}
                ownerAvatarUrl={ownerAvatarUrl}
            />
            <Statistics
                Stars={stargazersCount}
                Forks={forksCount}
                Reviews={reviewCount}
                Rating={ratingAverage}
            />
            { displayLink &&
            <GitHubButton url={url} />
            }
        </View>
    );
};

export default RepositoryItem;