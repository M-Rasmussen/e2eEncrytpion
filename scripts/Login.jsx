import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';
import { Socket } from './Socket';
import { Content } from './Content';

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [roomName, setroomName] = useState([-1]);

  function loginUser(response) {
    const name = response.getBasicProfile().getName();
    const email = response.getBasicProfile().getEmail();
    const idToken = response.getAuthResponse().id_token;
    Socket.emit('new google user', {
      name: name,
      email: email,
      idtoken: idToken
    });
  }

  function loginUserFail() {
    return false;
  }

  function verifiedSession() {
    React.useEffect(() => {
      Socket.on('Verified', (data) => {
        setLoggedIn(true);
        setUsername(data.name);
        setroomName(data.roomid);
      });
    }, []);
  }
  
  verifiedSession();

  if (loggedIn && roomName[0] != -1) {
    return (
      <div className="outermost">
      <h1 className="header">Chat APP</h1>
      <div className="container">
          <Content username={username} />
      </div>
    </div>
    );
  }
  return (
    <div className="outermost">
      <h1 className="header">Chat APP</h1>
      <div className="container">
          <GoogleLogin
            clientId="713754122186-g61h2i8np8ekhbtn7idqs3rlsi9t5jhn.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={loginUser}
            onFailure={loginUserFail}
            cookiePolicy="single_host_origin"
          />
      </div>
    </div>
  );
}


