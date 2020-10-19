import * as React from 'react';
import { Socket } from './Socket';
import './styles.css';
import { GoogleButton } from './GoogleButton';
import { LoginError } from './LoginError';


export function OnLine() {
    const [number, setNumber] = React.useState(0);
    const [logedin, setlogedin]=React.useState("");
    function newNumber() {
        React.useEffect(() => {
            Socket.on('user updated', (data) => {
                //console.log("Received a number from server: " + data['number']);
                setNumber(data['number']);
            });
        });
    }
    function loggedinbutton(){
        React.useEffect(() => {
            Socket.on('UserLogedIn',(data) => {
                setlogedin(data['loggedinbro']);
            });
        });
    }
    function displayLoginbutton(log){
        if(log == "logedin"){
            console.log("DISPLAY");
            return "logHide";
        }
        return "logDispay";
    }
    
    newNumber();
    loggedinbutton();

    return (
        <div className="grid-item onlinegrid">
            <div className={displayLoginbutton(logedin)}>
            <GoogleButton />
            </div>
            <p>Welcome to the chatroom, please enter your name in the bottom right hand corner and then feel free to send messages.</p>
            <p>Active Users:<span>{number}</span> </p>
            <LoginError />
        </div>
    );
}



