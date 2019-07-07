import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import {graphql, Subscription} from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from "subscriptions-transport-ws";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';


// Subscription 
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';


const GRAPHQL_ENDPOINT = "ws://localhost:5000/graphql";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:5000/'
})

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
    reconnect: true,
  });
  
// const link2 = new WebSocketLink(client);

const apolloClient = new ApolloClient({
    networkInterface: client,
    cache,
    link
});

// const wsLink = new WebSocketLink({
//     uri: `ws://localhost:5000/subscriptions`,
//     options: {
//       reconnect: true
//     }
//   });


const userCountApollo = gql`
    subscription {
        numOfUser
    }
`;


// apolloClient.subscribe({
//     query: gql`
//       subscription {
//           numOfUser 
//       }`,
//     variables: {}
//   }).subscribe({
//     next (data) {
//       // Notify your application with the new arrived data
//       console.log('subscribe socket happened')
//       console.log('NEW SOCKET DATA: ', data);
//     }
//   });

class Nav extends Component {
    // displayData = () => {
    //     const data = this.props.data;
    //     if (data.loading) {
            
    //     } else {
    //         console.log('GQL PROP: ', data);
    //     }
    // }


    
    render() {
        //console.log('GQL PROP: ', this.props.data.hello);

        const userCount = 1;
        
        
        return (
        <nav className="navbar">
            < a href="/" className="navbar-brand">Chatty Bat</a>
            <h3>
                <Subscription subscription={userCountApollo}> 
                    {({data}) => {
                        console.log('In-Data: ', data);
                        return <h3>{!data ? "waiting..." : data.numOfUser}</h3>;
                    }}
                </Subscription> 
                user(s) online</h3>
        </nav>
        );
    }
}


export default graphql(userCountApollo)(Nav);