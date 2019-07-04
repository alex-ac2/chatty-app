import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import {graphql} from 'react-apollo';

const helloApollo = gql`
  {
    hello
  }
`
const userCountApollo = gql`
  {
    userCount
  }
  `

class Nav extends Component {
    displayData = () => {
        const data = this.props.data;
        if (data.loading) {
            
        } else {
            console.log('GQL PROP: ', data);
        }
    }


    
    render() {
        //console.log('GQL PROP: ', this.props.data.hello);

        const userCount = 1;

        return (
        <nav className="navbar">
            < a href="/" className="navbar-brand">Chatty Bat</a>
            <h3>{this.props.data.userCount} user(s) online</h3>
        </nav>
        );
    }
}


export default graphql(userCountApollo)(Nav);