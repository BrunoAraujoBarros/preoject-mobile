import React from 'react';
import {StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import axios from 'axios';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:3000/graphql', cache: new InMemoryCache()
})

axios.defaults.baseURL = 'http://localhost:3000';


export default function App() {
  return (
      <ApolloProvider client={client}>
    <NavigationContainer>
      <StatusBar backgroundColor="#ADFF2F" barStyle="dark-content"/>
      <Routes />
    </NavigationContainer>
      </ApolloProvider>
  );
}
