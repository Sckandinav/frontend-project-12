import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import ChatProvider from './contexts/ChatProvider';
import AuthProvider from './contexts/AuthProvider';
import App from './components/App';
import store from './slices/store';

const socket = io();

ReactDOM.createRoot(document.getElementById('chat')).render(
  <Provider store={store}>
    <ChatProvider socket={socket}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChatProvider>
  </Provider>,
);
