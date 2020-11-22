import React, { useState, useEffect, useRef } from "react";
import { DoDecrypt } from "./encypted.js";
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

    return (
        <div className="ChatBox">
               {messages.map((message, index) =>
            <ul key={index}>
            
                        <li>Encrypted: {message}</li>
                        <li>Decrypted: { DoDecrypt(message)}</li>
            </ul>)}
        </div>
        );
}