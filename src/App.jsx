import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


function Nav() {
  return (
    <nav className="navbar">
      < a href="/" className="navbar-brand">Chatty</a>
    </nav>
  
  );
}



class Main extends Component {
  render() {
    return (
      <MessageList />
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Main />
        <ChatBar />
      </div>
    );
  }
}
export default App;
