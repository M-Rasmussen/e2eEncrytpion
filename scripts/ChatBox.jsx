    
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
    //console.log("chekcurl PIC 1");
    if(messaged.includes('<ahref=')|| messaged.includes('<imgsrc=')){
            //console.log("chekcurl PIC 2");
        var arrOfMess=messaged.split(' ');
            var i;
            var rtnMessageInfront=" ";
            var rtnMessageBack=" ";
            var flag=true;
            var imglink;
            var pic=true;
            for(i=0; i<arrOfMess.length; i++){
                //console.log(arrOfMess[i]);
                if(arrOfMess[i].includes('<ahref=')){
                    // let a= document.createElement('a');
                    // a.href=arrOfMess[i].slice(7);
                    // a.title=arrOfMess[i].slice(7);
                    // document.urlorpic.appendChild(a);
                    imglink=arrOfMess[i].slice(7); 
                    flag=false;
                    pic=false;
                    i++;
                }
                if(arrOfMess[i].includes('<imgsrc=')){
                    imglink=arrOfMess[i].slice(8);
                    // let img= document.createElement('img');
                    // img.src=arrOfMess[i].slice(8);
                    // document.urlorpic.appendChild(img);
                    // React.createElement("img",{url:arrOfMess[i].slice(8)})
                    i++;
                    flag=false;
                    pic=true;
                }
                if(flag){
                    //console.log(arrOfMess[i]);
                   rtnMessageInfront =rtnMessageInfront.concat(arrOfMess[i]," ");
                    //console.log(rtnMessageInfront);
                }else{
                   rtnMessageBack =rtnMessageBack.concat(arrOfMess[i], " ");
                }
        }
        if (pic){
            //onsole.log("PICTURE");
            //console.log(rtnMessageInfront);
        return(React.createElement("span", null, rtnMessageInfront,React.createElement("img",{src:imglink}),rtnMessageBack));
            
        }else{
    //console.log(rtnMessageInfront);
        return(React.createElement("span",null, rtnMessageInfront,React.createElement("a",{href:imglink}, imglink),rtnMessageBack));

        }
            // <div><p>{rtnMessageInfront}</p><div id="urlorpic"></div><p>{rtnMessageBack}</p></div>);
    
    }else{
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