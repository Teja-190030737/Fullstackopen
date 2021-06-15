import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";
import theme from "./theme";

const styles = StyleSheet.create({
    appBarTab: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: theme.colors.primary
    }
});


const AppBarTab = ({ name, to, style, onSubmit, isButton }) => {
    const appBarTabStyles = [
        styles.appBarTab,
        style
    ];

    return (
        <TouchableWithoutFeedback onPress={onSubmit}>
            { isButton ?
            <Text fontWeight="bold"
            color="textBar"
            style={appBarTabStyles}>
                {name}
            </Text> :
            <Link to={to || '/'}>
                <Text fontWeight="bold"
                color="textBar"
                style={appBarTabStyles}>
                    {name}
                </Text>
            </Link>
            }
        </TouchableWithoutFeedback>
    );
};

export default AppBarTab;