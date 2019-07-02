import React, {Component} from 'react';

class ChatBar extends Component {

    
    _handleKeyDown = (event) => {
        const messageInput = event.target;
        console.log(messageInput.value);
        if (event.keyCode === 13) {
            console.log("Enter was pressed");
            messageInput.value = "";
            
        } else {
            console.log("User is typing");
        }
    }


    render() {
      return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" 
          defaultValue={this.props.currentUser.toUpperCase()} />
          <input id="message-input" onKeyDown={this._handleKeyDown} name="message" 
          className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      );
    }
  }

  export default ChatBar;