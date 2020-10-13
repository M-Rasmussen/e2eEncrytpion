    
import * as React from 'react';
import './styles.css';

import { Socket } from './Socket';

export function ChatList(){

const [messages, setMessages] = React.useState([]);

     function getNewMessages() {
        React.useEffect(() => {
            Socket.on('message received', (data) => {
                setMessages(data['allMessages']);
            });
        });
    }

getNewMessages();

function checkSender(messaged){
    if (messaged.startsWith("bot:")){
        return('botsender');
    }
    return('userSender');
}
    
    return (
        <div className="grid-item chatgrid">
            <ul>
               {messages.map((message, index) =>
                    
                        <li key={index} className={checkSender(message)}><p>{message}</p></li>)}
            </ul>
        </div>
        );
}