import React from "react";
import { View, TouchableOpacity,
    StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "../FormikTextInput";
import Text from "../Text";
import theme from "../theme";

import useSignUp from "../../hooks/useSignUp";

const styles = StyleSheet.create({
    signupButton: {
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

const inititalValues = {
    username: '',
    password: '',
    passwordConfirm: ''
};

const validationSchema = yup.object().shape({
    username: yup
    .string()
    .min(1, 'Must have at least 1 character')
    .max(30, 'Must have at most 30 characters')
    .required('Username is required!')
    .trim(),
    password: yup
    .string()
    .min(5, 'Must have at least 5 characters')
    .max(50, 'Must have at most 50 characters')
    .required('Password is required!'),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must be matched')
    .required('Password confirmation is required!')
});

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username"
            placeholder="Username" />
            <FormikTextInput name="password"
            placeholder="Password" secureTextEntry />
            <FormikTextInput name="passwordConfirm"
            placeholder="Password confirmation"
            secureTextEntry />
            <TouchableOpacity onPress={onSubmit}>
                <Text fontWeight="bold"
                color="textBar"
                style={styles.signupButton}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const SignUp = () => {
    const { signUp } = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signUp({ username, password });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Formik initialValues={inititalValues} validationSchema={validationSchema}
        onSubmit={onSubmit}>
            { ({ handleSubmit }) => <SignUpForm onSubmit={ handleSubmit } /> }
        </Formik>
    );

};

export default SignUp;