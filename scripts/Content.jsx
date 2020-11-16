    
import * as React from 'react';
import { Button } from './Button';
import { ChatList } from './ChatBox'

export function Content( {username}) {
    return (
        <div>
            <p>logged in {username}</p>
            <Button username={username}/>
            <ChatList />
        </div>
    );
}
