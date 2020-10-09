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
         <input class="grid-item inputgrid" type="text" value={value} onChange={changed} />

            <button class="grid-item submitgrid" type = "submit">Send</button>
        </form>
    );
}
