import React, { useState } from 'react';
import { Socket } from './Socket';


export function Button() {
    const [value, setValue] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        Socket.emit('new message',{
            'message' : {value}
        });
    
    console.log('Sent a message ' + { value } + ' to server!');
    setValue("");
}


    function changed(event) {
        setValue(event.target.value);
            }
    return (
        <form onSubmit={handleSubmit}>
         <input type="text" value={value} onChange={changed} />

            <button type = "submit">Send</button>
        </form>
    );
}
