    
import * as React from 'react';
import './styles.css';

import { Socket } from './Socket';

export function ChatList(){

//const [user, setUser] = React.useState([]);
const [messages, setMessages] = React.useState([]);

    function getNewMessages() {
        React.useEffect(() => {
            Socket.on('message received', (data) => {
                console.log("Received a message from server sent by: " + data['sentUser']);
                //console.log("Received a number from server: " + data['sentMessage']);
                //setUser(data['allUser']);
                setMessages(data['allMessages']);
                    // ...messages,
                    // {

                    //     //sentUser: (data['sentUser']),
                    //     sentMessage: (data['allMessages'])
                    // }
            // ]
            // )  
            });
        });
    }
    //const ListItems = items.map((item) => <li>{item}</li>);
    
//     function IndivChat(props){
//         const dtUser=( 
//         props.messages.map((message) =>
//         <dt key={message.id}>
//           {message.sentUser}
//         </dt>));
        
//         const dlMessage=( 
//         props.messages.map((message) =>
//         <dl key={message.id}>
//           {message.sentUser}
//         </dl>));

// return (
    
//       {dtUser}
//       {dlMessage}
    
//   );
// }
getNewMessages();

  

    
    return (
        <div class="grid-item chatgrid">
            <dl>
                {messages.map((message, index) =>
                <div key ={index}>
                <dt>"abc"</dt>
                <dd>{message}</dd>
                </div>
                )}
            </dl>
        </div>
        );
}