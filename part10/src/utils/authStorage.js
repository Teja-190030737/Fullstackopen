import AsyncStorage from "@react-native-community/async-storage";

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const tokenString = await AsyncStorage.getItem(
            `${this.namespace}:token`
        );

        return tokenString ? JSON.parse(tokenString) : '';
    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            `${this.namespace}:token`,
            JSON.stringify(accessToken)
        );
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(
            `${this.namespace}:token`
        );
    }
}

export default AuthStorage;