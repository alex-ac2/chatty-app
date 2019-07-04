import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messageData from './../build/messageData.js';
import Navigation from './Nav.jsx';

// GraphQL and Apollo Client
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {graphql} from 'react-apollo';

// Apollo client
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

// client
//   .query({
//     query: gql`
//       {
//         hello
//       }
//     `
//   })
//   .then(result => console.log(result));

const helloApollo = gql`
  {
    hello
  }
`

class Main extends Component {
  render() {
    return (
      <MessageList messageData={this.props.messageData}/>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loading: true, 
      currentUser: 'jack', 
      messages: [], 
      messageData: []
    };
  }

  componentDidMount() {
    // Websocket connection
    this.socket = new WebSocket("ws://localhost:3001");
    const socketServer = this.socket;

    socketServer.onopen = (event) => {
      //socketServer.send("Test message from client"); 
      
      // Update message
      socketServer.onmessage = (event) => {
        const newIncomingMsg = event.data;
        console.log('INCOMING DATA: ', newIncomingMsg);
        console.log('STATE: ', this.state);
        
        const oldMessageData = this.state.messages;
        const newMessageData = [...oldMessageData, JSON.parse(newIncomingMsg)];
        this.setState({ messages: newMessageData });
      }


    };


    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({ loading: false, messageData: messageData }); // this triggers a re-render!
      console.log("Page loaded");
    }, 2000)
  }

  addNewMessage = (newMessageObject) => {
    // Send new message object to socket server
    const socketServer = this.socket;
    socketServer.send(JSON.stringify(newMessageObject));

    // Receive new message w/ uid from socket server
    // socketServer.onmessage = (event) => {
    //   console.log('INCOMING DATA: ', event.data);
    //   const newIncomingMsg = event.data;
      
    //   const oldMessageData = this.state.messages;
    //   const newMessageData = [...oldMessageData, JSON.parse(newIncomingMsg)];
    //   this.setState({ messages: newMessageData });
    // }
  }
    
  updateUser = (newUserName) => {
    console.log(this.state.currentUser, newUserName);
    const systemNotification = {
      type: "incomingNotification",
      content: `${this.state.currentUser.toLowerCase()} changed their name to ${newUserName.toUpperCase()}`,
      date: Date.now()
    }
    this.setState({ currentUser: newUserName })
    
    const socketServer = this.socket;
    socketServer.send(JSON.stringify(systemNotification));

  }


  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Navigation />
          <Main messageData={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} 
          updateUser={ newUser => this.updateUser(newUser)} 
          newMessage={this.addNewMessage} />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
