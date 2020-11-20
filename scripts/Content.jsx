    
import * as React from 'react';
import { Button } from './Button';
import { ChatList } from './ChatBox';
import { Join_Room} from './JoinRoom';

export function Content( {username}) {
    return (
        <div>
            <p>logged in {username}</p>
            <Button username={username}/>
            <ChatList />
            <Join_Room username={username}/>
        </div>
    );
}
