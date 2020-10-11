import * as React from 'react';
import { Socket } from './Socket';
import './styles.css';


export function OnLine() {
    const [number, setNumber] = React.useState(0);
    
    function newNumber() {
        React.useEffect(() => {
            Socket.on('user updated', (data) => {
                console.log("Received a number from server: " + data['number']);
                setNumber(data['number']);
            });
        });
    }
    
    newNumber();

    return (
        <div class="grid-item onlinegrid">
            <p>Active Users:<span>{number}</span> </p>
        </div>
    );
}



