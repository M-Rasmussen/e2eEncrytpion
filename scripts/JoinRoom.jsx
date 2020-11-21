import React, { useState } from 'react';
import { Socket } from './Socket';
import { Button } from './Button';
import { ChatList } from './ChatBox';
import './styles.css';


export function Join_Room({username}) {
const [text, setText] = useState("");

const [joinName, setJoinName] = React.useState("");
const [roomInName, setRoomInName]= React.useState("");
const [inRoom, setInRoom]=useState(false);
     function getRoomConformation() {
        React.useEffect(() => {
            Socket.on('joinedRoom', (data) => {
                setJoinName(data['name']);
                setRoomInName(data['room']);
                setInRoom(true);
            });
        });
    }

getRoomConformation();
const leave = () =>{
          Socket.emit("leave", {
          room: text,
          name: username
      });
      setRoomInName("");
      setInRoom(false);
};
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

if(inRoom){
   return(
    <div>
    <span>{joinName}</span>
        <h1>{roomInName}</h1>
        <button onClick={leave}>Leave Room</button>
        <Button username={username} roomInName={roomInName}/>
        <ChatList />
    </div>
    );
}
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
      </div>
    );
}
