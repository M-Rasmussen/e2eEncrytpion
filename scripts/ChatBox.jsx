    
import * as React from 'react';
import './styles.css';

import { Socket } from './Socket';

export function ChatList(){

//const [user, setUser] = React.useState([]);
const [messages, setMessages] = React.useState([]);

    function getNewMessages(x) {
        React.useEffect(() => {
            Socket.on('message received', (data) => {
                console.log("Received a message from server sent by: " + data['sentUser']);
                console.log("Received a number from server: " + data['sentMessage']);
                //setUser(data['allUser']);
                setMessages([
                    ...messages,
                    {
                        id: x,
                        sentUser: (data['sentUser']),
                        sentMessage: (data['sentMessage'])
                    }
            ])  
            })
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
getNewMessages(messages.length);

    const ListItems = messages.map((data) =>
    <div key ={data.id}>
    <dt>{data.sentUser}</dt>
    <dd>{data.sentMessage}</dd>
    </div>
    );
    return (
        <div class="grid-item chatgrid">
            <dl>
                {ListItems}
            </dl>
        </div>
        );
}