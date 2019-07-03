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
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({ loading: false, messageData: messageData }); // this triggers a re-render!
      console.log("Page loaded");
    }, 2000)
  }

  addNewMessage = (newMessageObject) => {
    const oldMessageData = this.state.messageData;
    const newMessageData = [...oldMessageData, newMessageObject];
    this.setState({ messageData: newMessageData });
  }

  render() {
    return (
      <div>
        <Nav />
        <Main messageData={this.state.messageData} />
        <ChatBar currentUser={this.state.currentUser} 
        updateUser={ newUser => this.setState({ currentUser: newUser })} 
        newMessage={this.addNewMessage} />
      </div>
    );
  }
}
export default App;
