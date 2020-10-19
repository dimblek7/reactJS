import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEng from "./locale_en.json";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: translationEng
    },
    jap: {
      translations: {
      }
    },

    hin: {
      translations: {
      }
    },

    ger: {
      translations: {
      }
    },
    fre: {
      translations: {
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",// key to use translations

  keySeparator: ".", // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;