    
import * as React from 'react';

import { Join_Room} from './JoinRoom';

export function Content( {username}) {
    return (
        <div>
            <Join_Room username={username}/>
        </div>
    );
}
