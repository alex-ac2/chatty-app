import React, {Component} from 'react';

class ChatBar extends Component {

  
    _handleKeyDown = (event) => {
        const messageInput = event.target;
    

        if (event.keyCode === 13) {
            console.log("Enter was pressed");
            console.log('CURRENT USER STATE: ', this.props.currentUser)
            const currentUser = this.props.currentUser;

            const newMessage = {
                type: "incomingMessage",
                content: messageInput.value,
                username: currentUser.toLowerCase(),
                date: Date.now()
                //id: Math.floor(100000 + Math.random() * 900000)
            }
            
            //console.log(newMessage);
            const renderMessage = this.props.newMessage;
            renderMessage(newMessage);

            messageInput.value = "";

            // Append new message

            
        } else {
            console.log("User is typing");
        }
    }

    _handleChangeUser = (event) => {
        const userInput = event.target;
        console.log(userInput.value);
        const updateUser = this.props.updateUser;
        
        if (userInput.value === "") {
            updateUser("anonymous");
        } else if (this.props.currentUser === userInput.value) {
            console.log("no change");
        } else {
            updateUser(userInput.value);
        }


            
        // this.setState({ currentUser: userInput.value }, () => {
        //     console.log('NEW-USER: ', this.state.currentUser);
        // });
    }


    render() {
      return (
        <footer className="chatbar">
          <input className="chatbar-username" onBlur={this._handleChangeUser}
          placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.toUpperCase()} />
          <input id="message-input" onKeyDown={this._handleKeyDown} name="message" 
          className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      );
    }
  }

  export default ChatBar;