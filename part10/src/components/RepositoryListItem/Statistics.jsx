import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "../Text";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    statistic: {
        flexDirection: 'column'
    },
    numericValue: {
        textAlign: 'center'
    },
    textualDescription: {
        textAlign: 'center'
    }
});

const Statistics = (props) => {
    return (
        <View style={styles.container}>
            { Object.keys(props).map(stat => 
                <View key={stat} style={styles.statistic} testID={stat}>
                    <Text
                    fontWeight='bold'
                    fontSize='subheading'
                    style={styles.numericValue}>
                    {
                    props[stat] >= 1000 ?
                        Number(props[stat] / 1000).toFixed(1) + 'k' :
                        String(props[stat])
                    }
                    </Text>
                    <Text
                    color='textSecondary'
                    fontSize='subheading'
                    style={styles.textualDescription}>
                        { stat }
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Statistics;