import { AUTHORIZE } from "../graphql/mutations";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';

const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHORIZE, {
        onCompleted: async (data) => {
            await authStorage.setAccessToken(data.authorize.accessToken);
            await apolloClient.resetStore();
        }
    });

    const signIn = async ({ username, password }) => {
        await mutate({ variables: { credentials: { username, password } } });
    };

    return [signIn, result];
};

export default useSignIn;