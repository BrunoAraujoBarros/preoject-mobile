import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

const getAuthToken = async () => {
    return await SecureStore.getItemAsync('userToken');
};

const authLink = new ApolloLink(async (operation, forward) => {
    const token = await getAuthToken();
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        }
    });
    return forward(operation);
});

const httpLink = new HttpLink({
    uri: 'http://10.0.2.2:3000/graphql',
});

const client = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
});

export default client;
