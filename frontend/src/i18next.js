import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales/index';

const DEFAULT_LANGUAGE = 'ru';

const initI18Next = async () => {
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
  return i18nextInstance;
};

export default initI18Next;
