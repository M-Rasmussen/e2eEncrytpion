import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import './styles.css';
import Login from './Login';

const rootElement = document.getElementById('content');
ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  rootElement
);