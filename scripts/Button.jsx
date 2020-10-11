import React, { useState } from 'react';
import { Socket } from './Socket';
import './styles.css';


export function Button() {
    const [message, setMessage] = useState("");
    const [userName, setname] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        Socket.emit('new message',{
            'message' : {message},
            'userName':{userName}
        });
    
    console.log('Sent a message ' + { message } + ' to server!');
    setMessage("");
}


    function changed(event) {
        setMessage(event.target.value);
            }
    function changedName(event){
        setname(event.target.value);
    }
 
    return (
        
         <div class="grid-item formwrappergrid">
        <form onSubmit={handleSubmit}>
                <input class="grid-item namegrid" type="text" value={userName} onChange={changedName}/>

         <input class="grid-item inputgrid" type="text" value={message} onChange={changed} />

            <button class="grid-item submitgrid" type = "submit">Send</button>
        </form>
        </div>
        
    );
}
