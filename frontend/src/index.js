import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import store from './slices/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('chat')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
