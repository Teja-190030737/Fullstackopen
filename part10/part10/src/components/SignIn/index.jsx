import React, { useContext } from "react";
import { View, TouchableWithoutFeedback,
    StyleSheet } from "react-native";
import { useHistory } from "react-router-native";

import { Formik } from "formik";
import * as yup from "yup";

import Text from "../Text";
import FormikTextInput from "../FormikTextInput";
import theme from "../theme";
import useSignIn from "../../hooks/useSignIn";
import AuthStorageContext from "../../contexts/AuthStorageContext";

const initialValues = {
    username: '',
    password: ''
};

const validationSchema = yup.object().shape({
    username: yup
    .string()
    .min(3, 'Username too short')
    .max(50, 'Username too long')
    .required('Username is required!')
    .trim(),
    password: yup
    .string()
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#%?$@&=]).{8,}$/,
    // 'Password must contain 1 digit, ' +
    // '1 lowercase letter(a-z), 1 uppercase letter(A-Z), ' +
    // 'and 1 special character(!#%?$"&=) and at least 8 characters long.')
    .required('Password is required!')
    .trim()
});

const styles = StyleSheet.create({
    submitTouch: {
        backgroundColor: theme.colors.primary,
        textAlign: 'center',
        padding: 15,
        margin: 10,
        borderRadius: 5
    },
    container: {
        backgroundColor: theme.colors.textBar
    }
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" testID="username" />
            <FormikTextInput name="password" placeholder="Password" testID="password"
            secureTextEntry />
            <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
                <Text
                color="textBar"
                fontWeight="bold"
                style={styles.submitTouch}>
                    Sign In
                </Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const SignInContainer = ({ signIn, isTest }) => {
    const history = useHistory();
    const authStorage = useContext(AuthStorageContext);

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signIn({ username, password });
            if (!isTest) {
                console.log(await authStorage.getAccessToken());
                history.push('/');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}
        validationSchema={validationSchema}>
            {({ handleSubmit }) => {
                return (
                    <SignInForm onSubmit={ handleSubmit } />
                );
            } }
        </Formik>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    
    return <SignInContainer signIn={signIn} />;
};

export default SignIn;