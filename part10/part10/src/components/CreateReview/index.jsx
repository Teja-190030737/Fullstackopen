import React from "react";
import { View, StyleSheet,
    TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "../FormikTextInput";
import Text from "../Text";
import theme from "../theme";
import useCreateReview from "../../hooks/useCreateReview";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.textBar
    },
    createButton: {
        backgroundColor: theme.colors.primary,
        textAlign: 'center',
        padding: 15,
        margin: 10,
        borderRadius: 5
    }
});

const initialValues = {
    repositoryOwner: '',
    repositoryName: '',
    rating: '',
    text: ''
};

const validationSchema = yup.object().shape({
    repositoryOwner: yup
    .string()
    .required('Repository Owner Name is required!')
    .trim(),
    repositoryName: yup
    .string()
    .required('Repository Name is required')
    .trim(),
    rating: yup
    .number()
    .integer('Must be an integer')
    .min(0, 'Must not lower than 0')
    .max(100, 'Must not greater than 100')
    .required('Rating is required'),
    text: yup
    .string()
});

const CreateReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="repositoryOwner"
            placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName"
            placeholder="Repository name" />
            <FormikTextInput name="rating"
            placeholder="Rating between 0 and 100" />
            <FormikTextInput name="text"
            placeholder="Review" multiline />
            <TouchableOpacity onPress={onSubmit}>
                <Text fontWeight="bold"
                color="textBar"
                style={styles.createButton}>
                    Create a review
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const CreateReview = () => {
    const [createReview] = useCreateReview();

    const onSubmit = async (values) => {
        const { repositoryName, repositoryOwner, rating, text } = values;
        
        try {
            await createReview({
                repositoryName,
                repositoryOwner,
                rating,
                text 
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}
        validationSchema={validationSchema}>
            { ({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />  }
        </Formik>
    );
};

export default CreateReview;