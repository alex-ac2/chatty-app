import React, {Component} from 'react';

class Notification extends Component {
    render() {
        return (
            <div className="message">
                <span className="message-content"><i>{this.props.content}</i></span>
            </div>            
        );

    }

}

export default Notification;