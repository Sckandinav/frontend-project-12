import React from 'react';
import { I18nextProvider } from 'react-i18next';
import * as leoProfanity from 'leo-profanity';

import ChatProvider from './contexts/ChatProvider';
import AuthProvider from './contexts/AuthProvider';
import App from './components/App';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import initI18Next from './i18next';
import store from './slices/store';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';

const initApp = async (socket) => {
  const rollbarConfig = {
    accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  const i18nextInstance = await initI18Next();
  const russianDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(russianDictionary);

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) =>
    store.dispatch(channelsActions.removeChannel(payload.id)),
  );

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18nextInstance}>
          <AuthProvider>
            <ChatProvider socket={socket}>
              <App />
            </ChatProvider>
          </AuthProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default initApp;
