import * as React from 'react';
import { Socket } from './Socket';
import './styles.css';
import { GoogleButton } from './GoogleButton';


export function OnLine() {
    const [number, setNumber] = React.useState(0);

    function newNumber() {
        React.useEffect(() => {
            Socket.on('user updated', (data) => {
                //console.log("Received a number from server: " + data['number']);
                setNumber(data['number']);
            });
        });
    }

    
    newNumber();
    return (
        <div className="grid-item onlinegrid">
            <GoogleButton />
            <p>Welcome to the chatroom, please enter your name in the bottom right hand corner and then feel free to send messages.</p>
            <p>Active Users:<span>{number}</span> </p>
        </div>
    );
}



