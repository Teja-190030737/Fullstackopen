import React from "react";
import { View, StyleSheet } from "react-native";
import { Switch, Route, Redirect } from 'react-router-native';

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import AboutMe from "./AboutMe";
import Repository from "./Repository";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import UserReviewList from "./UserReviewList";
import theme from "./theme";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackgroundColor
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path='/user/reviews'>
                    <UserReviewList />
                </Route>
                <Route path='/' exact>
                    <RepositoryList />
                </Route>
                <Route path='/signin'>
                    <SignIn />
                </Route>
                <Route path='/aboutme'>
                    <AboutMe />
                </Route>
                <Route path='/create'>
                    <CreateReview />
                </Route>
                <Route path='/signup'>
                    <SignUp />
                </Route>
                <Route path='/:id'>
                    <Repository />
                </Route>
                <Redirect to='/' />
            </Switch>
        </View>
    );
};

export default Main;