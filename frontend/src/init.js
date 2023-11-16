import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import * as leoProfanity from 'leo-profanity';

import ChatProvider from './contexts/ChatProvider';
import AuthProvider from './contexts/AuthProvider';
import App from './components/App';
import resources from './locales/index';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const DEFAULT_LANGUAGE = 'ru';

const init = async () => {
  const rollbarConfig = {
    accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  const i18nextInstance = i18next.createInstance();

  await i18nextInstance.use(initReactI18next).init({
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

  const socket = io();

  const russianDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(russianDictionary);

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

export default init;
