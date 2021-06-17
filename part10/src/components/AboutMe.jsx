import React from "react";
import { View, StyleSheet } from "react-native";

import Description from "./RepositoryListItem/Description";
import theme from "./theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.textBar,
        padding: 20
    }
});

const myAvatar='https://avatars.githubusercontent.com/u/20899059?s=400&v=4';
const fullName='Son To';
const languages=['TypeScript', 'JavaScript', 'MERN', 
'React Native', 'Webpack', 'Docker', 'Kubernetes', 'AWS'];

const AboutMe = () => {
    return (
        <View style={styles.container}>
            <Description ownerAvatarUrl={myAvatar}
            fullName={fullName}
            languages={languages}
            description={
                'I am a fullstack web developer, and ' +
                'this is a small Rating Repository App written ' +
                'specifically on courtesy of the course ' +
                'FullStack Open 2020, part 10.' + '\n\n' +
                'At the time of making this app, ' +
                'I am having 2 certificates in web development.'
            } />
        </View>
    );
};

export default AboutMe;