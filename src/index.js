import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import chars from './chars';

ReactDOM.render(
  <App chars={chars}/>,
  document.getElementById('root')
);
