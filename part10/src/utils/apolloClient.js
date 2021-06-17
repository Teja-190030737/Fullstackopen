import ApolloClient from "apollo-boost";
import Constants from "expo-constants";

const createApolloClient = (authStorage) => {
    return new ApolloClient({
        request: async (operation) => {
            try {
                const token = await authStorage.getAccessToken();
                operation.setContext({
                    headers: {
                        authorization: token ? `Bearer ${token}` : ''
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        uri: Constants.manifest.extra.apollo_uri
    });
};

export default createApolloClient;