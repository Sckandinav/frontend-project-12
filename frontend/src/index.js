import './scss/custom.scss';
import './scss/style.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import store from './slices/store';
import initApp from './init.js';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const init = await initApp(socket);
  root.render(<Provider store={store}>{init}</Provider>);
};

app();
