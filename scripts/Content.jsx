    
import * as React from 'react';
import "./styles.css"

import { Button } from './Button';
import { Socket } from './Socket';
import { ChatList } from './ChatBox'
export function Content() {


    return (
        <div class ="grid-container">
            <div class="grid-item onlinegrid"></div>
            <ChatList />
            <Button />
        </div>
    );
}
