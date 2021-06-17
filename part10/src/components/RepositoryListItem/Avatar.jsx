import React from "react";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    avatarSize: {
        width: 80,
        height: 80,
        flexGrow: 0,
        borderRadius: 5
    }
});

const Avatar = ({ ownerAvatarUrl }) => {
    return (
        <Image
        style={styles.avatarSize}
        source={{
            uri: ownerAvatarUrl
        }}
        />
    );
};

export default Avatar;