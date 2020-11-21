    
import * as React from 'react';

import { Join_Room} from './JoinRoom';

export function Content( {username}) {
    return (
        <div>
            <p>logged in {username}</p>
            <Join_Room username={username}/>
        </div>
    );
}
