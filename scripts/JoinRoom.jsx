import React, { useState } from 'react';
import { Socket } from './Socket';
import './styles.css';


export function Join_Room({username}) {
const [text, setText] = useState("");

const [joinName, setJoinName] = React.useState("");
const [roomIn, setRoomIn]= React.useState("");

     function getRoomConformation() {
        React.useEffect(() => {
            Socket.on('joinedRoom', (data) => {
                setJoinName(data['name']);
                setRoomIn(data['room']);
            });
        });
    }

getRoomConformation();

const join = () => {
    if (text !== "") {
      //encrypt here 
      Socket.emit("join", {
          room: text,
          name: username
      });
      setText("");
    }
  };
return(
    <div>
        <input
          placeholder="enter your Room ID"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              join();
            }
          }}
        ></input>
        <button onClick={join}>Send</button>
        
        <span>{joinName}</span>
        <h1>{roomIn}</h1>
      </div>
    );
}
