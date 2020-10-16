import * as React from 'react';
import { Socket } from './Socket';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}
 

function handleSubmit(response) {
      console.log(response.profileObj.name);

    let name = response.profileObj.name;
    Socket.emit('new google user', {
        'name': name,
    });
    
    console.log('Sent the name ' + name + ' to server!');
}

export function GoogleButton() {
return<GoogleLogin
    clientId="835080147796-gcu3obt8c86gfqvbo27aueegc80fub7p.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={handleSubmit}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />;
}
