    
import * as React from 'react';
import './styles.css';

import { Socket } from './Socket';

export function ChatList(){

//const [user, setUser] = React.useState([]);
const [messages, setMessages] = React.useState([]);
//const [namesed, setnamesed]=React.useState([]);

    function getNewMessages() {
        React.useEffect(() => {
            Socket.on('message received', (data) => {
                console.log("Received a message from server sent by: " + data['sentUser']);
                //console.log("Received a number from server: " + data['sentMessage']);
                //setUser(data['allUser']);
                console.log(data['allMessages']);
                console.log(data['allNames']);
                              
                setMessages([
                    ...messages,
                    {
                        nameds: (data['allNames']),
                        messageds: (data['allMessages'])
                    }
                    ]);
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

const ListofItems=messages.map((message, index)=>
<div>
<dt key= {index}>{message.nameds}</dt>
                <dd>{message.messageds}</dd>
                </div>);
  

    
    return (
        <div class="grid-item chatgrid">
            <dl>
    {ListofItems}
    </dl>
        </div>
        );
}