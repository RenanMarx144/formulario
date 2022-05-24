import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/global.scss';
import App from './App';
import './services/firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);