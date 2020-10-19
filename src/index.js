import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/localization/config";
import Root from "./routes";
import { store, persistedStore } from "./store";
import "assets/scss/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import fe_config from "constants/Configs";
import { PersistGate } from "redux-persist/integration/react";

/* eslint eqeqeq: "off", curly: "error" */
fe_config.MODE === "PROD" && (console.log = console.warn = console.error = () => {});
fe_config.MODE === "DEV" && (console.warn = () => {});

// Toaster
toast.configure({
  autoClose: 3000,
  draggable: false,
});


/**
 * Set up a store provider
 */
ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <Root i18n={i18n} />
      </PersistGate>
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);
