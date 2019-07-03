import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {

        const messageData = this.props.messageData;
        console.log(messageData);

        const messageItems = this.props.messageData.map( (message) => {
            if (message.type === "incomingMessage") {
                return <Message username={message.username} content={message.content} 
                id={message.id} key={message.id} />
            }
        });
        


 


        return (
            <main className="messages">
                {messageItems}
            </main>
        );
    }
}

export default MessageList;