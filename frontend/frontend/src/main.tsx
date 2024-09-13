import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Change this to use App instead of AppRouter

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);