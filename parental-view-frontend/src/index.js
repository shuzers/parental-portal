
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// Polyfill Buffer for browser compatibility
window.Buffer = window.Buffer || require('buffer').Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
