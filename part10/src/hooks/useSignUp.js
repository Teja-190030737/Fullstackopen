import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

import useSignIn from "./useSignIn";

import { useHistory } from "react-router-native";

const useSignUp = () => {
    const [signIn] = useSignIn();
    const history = useHistory();
    const [mutate] = useMutation(CREATE_USER);

    const signUp = async ({ username, password }) => {
        await mutate({ variables: { username, password } });
        await signIn({ username, password });
        history.push('/');
    };

    return { signUp };
};

export default useSignUp;