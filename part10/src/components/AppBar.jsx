import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

import theme from "./theme";
import AppBarTab from "./AppBarTab";
import useLogOut from "../hooks/useLogOut";
import useAuthorizedUser from "../hooks/useAuthorizedUser";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: theme.colors.appBarBackgroundColor,
        paddingBottom: 20
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'space-around',
        width: 750
    },
    signOutTab: {
        backgroundColor: theme.colors.error,
        borderColor: theme.colors.appBarBackgroundColor
    }
});

const AppBar = () => {
    const { authorizedUser } = useAuthorizedUser({
        includeReviews: false
    });
    const { logout } = useLogOut();

    return (
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.scrollView}>
                <AppBarTab name="Repositories" to="/" />
                { !authorizedUser &&
                <AppBarTab name="Sign In" to="/signin" />
                }
                { !authorizedUser &&
                <AppBarTab name="Sign Up" to="/signup" />
                }
                { authorizedUser &&
                <AppBarTab name="Create a review"
                to="/create" />
                }
                { authorizedUser &&
                <AppBarTab name="My reviews"
                to="/user/reviews" />
                }
                { authorizedUser &&
                <AppBarTab name="Sign Out"
                onSubmit={logout}
                style={styles.signOutTab}
                isButton />
                }
                <AppBarTab name="About Me" to="/aboutme" />
            </ScrollView>
        </View>
    );
};

export default AppBar;