import React, { useState } from 'react';
import { Socket } from './Socket';
import { DoDecrypt, DoEncrypt } from './encypted'
import './styles.css';


export function Button({username, roomInName}) {
const [text, setText] = useState("");
// const [roomInName, setInNameRoom]= useState("123")
const sendData = () => {
    if (text !== "") {
      //encrypt here
      let str = ": ";
      let usertext= username.concat(str, text);
      const data = DoEncrypt(usertext);
      Socket.emit("chat", {
        message: data,
        roomid: roomInName
      });
      setText("");
    }
  };
return(
    <div>
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    );
}
