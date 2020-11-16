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
        <div>
            <ul>
               {messages.map((message, index) =>
                        <li key={index} >{ DoDecrypt(message)}</li>)}
            </ul>
        </div>
        );
}