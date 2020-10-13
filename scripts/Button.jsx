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
         <div className="grid-item formwrappergrid">
        <form onSubmit={handleSubmit}>
            <input className="grid-item namegrid" type="text" value={userName} onChange={changedName} placeholder="Enter your name" required/>
            <input className="grid-item inputgrid" type="text" value={message} onChange={changed} placeholder="enter message" required/>
            <button className="grid-item submitgrid" type = "submit">Send</button>
        </form>
        </div>

    );
}
