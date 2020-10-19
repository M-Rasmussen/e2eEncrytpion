    
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

function checkUrlPic(messaged){
  
    if(messaged.includes('<a href=')|| messaged.includes('<img src=')){
        console.log("here1");
        if(messaged.includes('<a href=')){
                    console.log("here tag");
            var arrOfMess=messaged.split(' ');
            var i;
            var rtnMessageInfront=" ";
            var rtnMessageBack=" ";
            var cleanupLink;
            var flag=true;
            for(i=0; i<arrOfMess.length; i++){
                if(arrOfMess[i].includes('<a href=')){
                    console.log("here2");
                    flag=false;
                    cleanupLink.concat('"',arrOfMess[i].slice(8),'"');
                    console.log(cleanupLink);
                }
                if(flag){
                    rtnMessageInfront.concat(arrOfMess[i]," ");
                }else{
                    rtnMessageBack.concat(arrOfMess[i], " ");
                }
        }
        console.log(rtnMessageInfront);
        console.log(cleanupLink);
        console.log(rtnMessageBack);
        return(<div><p>{rtnMessageInfront}</p><a href={cleanupLink}>{cleanupLink}</a><p>{rtnMessageBack}</p></div>);
        }else{
            let i;
            let rtnMessageInfront=" ";
            let rtnMessageBack=" ";
            let cleanupLink=" ";
            flag=true;
            for(i=0; i<arrOfMess.length; i++){
                if(arrOfMess[i].includes('<img src=')){
                    flag=false;
                    cleanupLink.concat('"',arrOfMess[i].slice(9),'"');
                }
                if(flag){
                    rtnMessageInfront.concat(arrOfMess[i]," ");
                }else{
                    rtnMessageBack.concat(arrOfMess[i], " ");
                }
        }
return(<div><p>{rtnMessageInfront}</p><img src={cleanupLink}></img><p>{rtnMessageBack}</p></div>);
    }
    }
    
    else{
        return(<div><p>{messaged}</p></div>);

    }
    
}
    
    return (
        <div className="grid-item chatgrid">
            <ul>
               {messages.map((message, index) =>
                    
                        <li key={index} className={checkSender(message)}>{checkUrlPic(message)}</li>)}
            </ul>
        </div>
        );
}