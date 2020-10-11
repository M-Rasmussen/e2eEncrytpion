    
import * as React from 'react';
import './styles.css';

import { Socket } from './Socket';

export function ChatList(){

//const [user, setUser] = React.useState([]);
const [messages, setMessages] = React.useState([]);
//const [namesed, setnamesed]=React.useState([]);

    // function getNewMessages() {
    //     React.useEffect(() => {
    //         Socket.on('message received', (data) => {
    //             console.log("Received a message from server sent by: " + data['allMessages']);
    //             //console.log("Received a number from server: " + data['sentMessage']);
    //             //setUser(data['allUser']);
    //             console.log(data['allMessages']);
    //             console.log(data['allNames']);
                              
    //             setMessages([
    //                 ...messages,
    //                 {
    //                     nameds: (data['allNames']),
    //                     messageds: (data['allMessages'])
    //                 }
    //                 ]);
    //         });
    //     });
    // }
    
     function getNewMessages() {
        React.useEffect(() => {
            Socket.on('message received', (data) => {
                console.log("Received addresses from server: " + data['allMessages']);
                setMessages(data['allMessages']);
            });
        });
    }

getNewMessages();

// const ListofItems=messages.map((message, index)=>
// <div>
// <dt key= {index}>{message.nameds[index]}</dt>
//                 <dd>{message.messageds[index]}</dd>
//                 </div>);
  

    
    return (
        <div class="grid-item chatgrid">
            <ul>
               {messages.map((message, index) =>
                        <li key={index}>{message}</li>)}
            </ul>
        </div>
        );
}