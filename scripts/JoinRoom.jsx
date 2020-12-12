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
      Socket.emit("join", {
          room: text,
          name: username
      });
      setText("");
    }
  };

if(inRoom){
   return(
    <div className="ContainerHeight">
        <div className= "leftSide">
        <h3>You are in </h3>
        <h3>{roomInName}</h3>
        <button onClick={leave}>Leave Room</button>
        </div>
        <div className="rightSide">
        <ChatList/>
        <Button username={username} roomInName={roomInName}/>
        </div>
    </div>
    );
}
return(
    <div>
        <h3>Please Enter the Room</h3>
        <input
          placeholder="Enter Room Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              join();
            }
          }}
        ></input>
        <button onClick={join}>Join</button>
      </div>
    );
}
