import AuthStorageContext from "../contexts/AuthStorageContext";
import { useContext } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-native";

const useLogOut = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    const history = useHistory();

    const logout = async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
        history.push('/');
    };

    return { logout };
};

export default useLogOut;