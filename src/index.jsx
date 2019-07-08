// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// Apollo Graphql Client
import { ApolloClient, InMemoryCache, HttpLink, split } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// Apollo Server connection
const httpLink = new HttpLink({
    uri: "http://localhost:5000/graphql"
});

// Apollo subscription socket connection
const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/graphql`,
    options: {
        reconnect: true
    }
});

// Manage query and subscription link --> boilerplate code from Ben Awad GraphQL sample 
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({ link, cache: new InMemoryCache() });

ReactDOM.render(
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>, 
    document.getElementById('react-root')
);

