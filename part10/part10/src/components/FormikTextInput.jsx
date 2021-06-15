import React from "react";
import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "./theme";

const styles = StyleSheet.create({
    errorText: {
        color: theme.colors.error,
        margin: 15,
        marginTop: 5,
        marginBottom: 20
    }
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <React.Fragment>
            <TextInput
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            { showError && <Text style={styles.errorText}>{meta.error}</Text> }
        </React.Fragment>
    );
};

export default FormikTextInput;