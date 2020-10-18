import * as React from 'react';
import { Socket } from './Socket';
import './styles.css';


export function LoginError() {
    const [message, setMessage] = React.useState("");

    function newErrorMessage() {
        React.useEffect(() => {
            Socket.on('messageError', (data) => {
                console.log("Received a error from server: " + data['errormessage']);
                setMessage(data['errormessage']);
            });
        });
    }

    
    newErrorMessage();
    return (
        <div>
            <p> {message} </p>
        </div>
    );
}



