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
            <ul>
               {messages.map((message, index) =>
                        <li key={index}><span className="widthspace">{message}</span><span className="widthspace">{ DoDecrypt(message)}</span></li>)}
            </ul>
        </div>
        );
}