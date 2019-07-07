import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import {graphql, Subscription} from 'react-apollo';
import axios from 'axios';


const userCountApollo = gql`
    subscription {
        numOfUser
    }
`;

let startData = [];
axios.post('http://localhost:5000/graphql', {
    "query": `query { numOfUser }`
  })
  .then(function (response) {
    startData.push(response.data.data.numOfUser);
  })
  .catch(function (error) {
    console.log(error);
  });

class Nav extends Component {
   
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
                        return <h3>{!data ? startData[0] : data.numOfUser}</h3>;
                    }}
                </Subscription> 
                user(s) online</h3>
        </nav>
        );
    }
}


export default graphql(userCountApollo)(Nav);