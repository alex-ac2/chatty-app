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
             
        return (
        <nav className="navbar">
            < a href="/" className="navbar-brand">Chatty</a>         
            <h3>
                <Subscription subscription={userCountApollo}> 
                    {({data}) => {
                        console.log('In-Data: ', data);
                        return <div>{!data ? (!startData[0]) ? '...Waiting ' : (startData[0] > 1) ?                                 
                        `${startData[0]} users online` : `${startData[0]} user online` :
                        (data.numOfUser > 1) ? `${data.numOfUser} users online` : `${data.numOfUser} user online`}</div>;
                    }}
                </Subscription> 
            </h3>
        </nav>
        );
    }
}


export default graphql(userCountApollo)(Nav);