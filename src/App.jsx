import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messageData from './../build/messageData.js';


function Nav() {
  return (
    <nav className="navbar">
      < a href="/" className="navbar-brand">Chatty Bat</a>
    </nav>
  
  );
}

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

    socketServer.onopen = function (event) {
      //socketServer.send("Test message from client"); 
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
    socketServer.onmessage = (event) => {
      console.log('INCOMING DATA: ', event.data);
      const newIncomingMsg = event.data;
      
      const oldMessageData = this.state.messages;
      const newMessageData = [...oldMessageData, JSON.parse(newIncomingMsg)];
      this.setState({ messages: newMessageData });
    }
  }
    


  render() {
    return (
      <div>
        <Nav />
        <Main messageData={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} 
        updateUser={ newUser => this.setState({ currentUser: newUser })} 
        newMessage={this.addNewMessage} />
      </div>
    );
  }
}
export default App;
